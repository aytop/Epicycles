package com.levi9.imgtocurve.controller;

import com.levi9.imgtocurve.processing.DiscreteFourierTransform;
import com.levi9.imgtocurve.processing.ImageToContourTransform;
import com.levi9.imgtocurve.processing.MinPathFind;
import com.levi9.imgtocurve.storage.StorageService;
import entity.Epicycle;
import entity.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.logging.Logger;

@RestController
public class ImageUploadController
{
	@Autowired
	private  StorageService storageService;
	
	@PostMapping("/epicycles")
	public Epicycle[] handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("order") int order) {
		Logger.getLogger(getClass().getName()).info(""+order);
		Path                    imagePath = storageService.store(file);
		ImageToContourTransform transform = new ImageToContourTransform(imagePath);
		List<Point>             points    = transform.getContourPoints();
		MinPathFind             pathFind  = new MinPathFind(points);
		points = pathFind.getPoints();
		DiscreteFourierTransform fourierTransform = new DiscreteFourierTransform(points, order/2);
		return  fourierTransform.getEpicycles();
	}
	
	@PostMapping("/contour")
	public Point[] getPoints(@RequestParam("file") MultipartFile file)
	{
		Path                    imagePath = storageService.store(file);
		ImageToContourTransform transform = new ImageToContourTransform(imagePath);
		List<Point>             points    = transform.getContourPoints();
		MinPathFind find = new MinPathFind(points);
		points = find.getPoints();
		Point[] result = new Point[points.size()];
		int index=0;
		for(Point point : points)
		{
			result[index++] = point;
		}
		return result;
	}
	
}
