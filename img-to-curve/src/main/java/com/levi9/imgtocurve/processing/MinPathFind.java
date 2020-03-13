package com.levi9.imgtocurve.processing;

import entity.Point;

import java.util.Collections;
import java.util.List;
import java.util.Random;

public class MinPathFind
{
	private List<Point> points;
	
	public MinPathFind(List<Point> points)
	{
		this.points = points;
		centralize();
		sort();
		
	}
	private void sort()
	{
		if(points.size()< 2)
			return;
		for(int i=0;i<points.size()-1;i++)
		{
			double minDistance=Double.MAX_VALUE;
			int indexToSwap = i+1;
			for(int j=i+1;j<points.size();j++)
			{
				double distance =points.get(i).distance(points.get(j));
				if(distance<minDistance)
				{
					minDistance=distance;
					indexToSwap = j;
				}
			}
			Collections.swap(points, i+1, indexToSwap);
		}
	}
	private void centralize()
	{
		double xAverage = 0;
		double yAverage = 0;
		for(Point point:points)
		{
			xAverage+=point.getX();
			yAverage+=point.getY();
		}
		xAverage/=points.size();
		yAverage/=points.size();
		Point massCenter = new Point(xAverage,yAverage);
		massCenter.mul(-1);
		for (Point point:points)
		{
			point.translate(massCenter);
		}
	}
	
	public List<Point> getPoints()
	{
		return points;
	}
}
