package com.levi9.imgtocurve.processing;

import entity.Epicycle;
import entity.Point;
import org.apache.commons.math3.analysis.UnivariateFunction;
import org.apache.commons.math3.analysis.integration.IterativeLegendreGaussIntegrator;
import org.apache.commons.math3.complex.Complex;
import org.apache.commons.math3.transform.DftNormalization;
import org.apache.commons.math3.transform.FastFourierTransformer;
import org.apache.commons.math3.transform.TransformType;
import org.apache.commons.math3.util.FastMath;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

public class DiscreteFourierTransform
{
	
	private Complex[] points;
	
	private Epicycle[] epicycles;
	private Logger logger = Logger.getLogger(getClass().getName());
	
	public DiscreteFourierTransform(List<Point> points, int order)
	{
		this.epicycles = new Epicycle[order*2+1];
		this.points = new Complex[points.size()];
		Complex[] coefficients = new Complex[order*2+1];
		int index=0;
		for(Point point:points)
		{
			this.points[index++] = new Complex(point.getX(),point.getY());
		}
		for(int i=0;i<coefficients.length;i++)
		{
			coefficients[i] = integrate(i-order);
		}
		index=0;
		for(Complex complex: coefficients)
		{
			this.epicycles[index] = new Epicycle(complex.abs(), complex.getArgument(), index-order);
			index++;
		}
//		Arrays.sort(this.epicycles);
		normalize();
	}
	
	
	private void normalize(){
		double max = epicycles[0].getRadius();
		for(int i=1;i<epicycles.length;i++)
		{
			if(epicycles[i].getRadius()> max)
			{
				max = epicycles[i].getRadius();
			}
		}
		for(int i =0;i<epicycles.length;i++)
		{
			epicycles[i].scaleRadius(max);
		}
	}
	private  Complex integrate(int n)
	{
		int size = this.points.length;
		Complex integral = Complex.ZERO;
		for(int t =0;t<size;t++)
		{
			double angle = (-n*Math.PI*t)/size;
			Complex partialSum = new Complex(Math.cos(angle), Math.sin(angle));
			partialSum = partialSum.multiply(points[t]);
			if(t!=0 && t!=size-1)
			{
				if(t%2==0)
				{
					partialSum = partialSum.multiply(2);
				}
				else
				{
					partialSum = partialSum.multiply(4);
				}
			}
			integral = integral.add(partialSum);
		}
		integral = integral.divide(3);
		return integral;
	}
	public Epicycle[] getEpicycles()
	{
		return epicycles;
	}
}
