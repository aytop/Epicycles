package com.levi9.imgtocurve.processing;



import entity.Point;
import org.bytedeco.javacpp.indexer.UByteRawIndexer;
import org.bytedeco.javacv.CanvasFrame;
import org.bytedeco.javacv.OpenCVFrameConverter;
import org.bytedeco.opencv.opencv_core.Mat;
import org.bytedeco.opencv.opencv_core.Size;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static org.bytedeco.opencv.global.opencv_core.*;
import static org.bytedeco.opencv.global.opencv_imgcodecs.imread;
import static org.bytedeco.opencv.global.opencv_imgproc.*;

public class ImageToContourTransform
{
	
	private Mat imageMatrix;
	private List<Point> contourPoints;
	Logger logger = Logger.getLogger(getClass().getName());
	
	public ImageToContourTransform(Path imagePath)
	{
		this.imageMatrix = imread(imagePath.toString());
		int height = this.imageMatrix.rows();
		int width = this.imageMatrix.cols();
		
		Mat grayImage = new Mat(height, width, CV_8UC1);
		
		// Convert image to grayscale and blur the image
		cvtColor(this.imageMatrix, grayImage, CV_BGR2GRAY);
		blur(grayImage, grayImage, new Size(5,5));
		
		// if image is dark then keep light part, otherwise keep dark parts
		int filter =  mean(grayImage).get() > 125? CV_THRESH_BINARY: CV_THRESH_BINARY_INV;
		threshold(grayImage, grayImage, 110, 255, filter);
		
		// detect edges
		Canny(grayImage, grayImage, 100,200);
		// for every point on image if it is on contour save it for further processing
		this.contourPoints = new ArrayList<>();
		logger.info(grayImage.cols()+" x "+ grayImage.rows());
		UByteRawIndexer indexer = grayImage.createIndexer();
		for(int h=0;h<height;h++)
		{
			for(int w=0;w<width;w++)
			{
				if(indexer.get(h,w)!=0)
				{
					contourPoints.add(new Point(w,h));
				}
				
			}
		}
	}
	
	public List<Point> getContourPoints()
	{
		return contourPoints;
	}
	
	private void display(Mat image, String caption) {
		// Create image window named "My Image".
		CanvasFrame canvas = new CanvasFrame(caption, 1.0);
		
		
		// Convert from OpenCV Mat to Java Buffered image for display
		OpenCVFrameConverter converter = new OpenCVFrameConverter.ToMat();
		// Show image on window.
		canvas.showImage(converter.convert(image));
	}
	
}

