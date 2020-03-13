package entity;

public class Point
{
	private double x;
	private double y;
	
	public Point(double x, double y)
	{
		this.x = x;
		this.y = y;
	}
	
	public double getX()
	{
		return x;
	}
	
	public double getY()
	{
		return y;
	}
	
	@Override
	public String toString()
	{
		return "Point(" + x +", " + y +")";
	}
	
	public double distance(Point other)
	{
		double xDifference = this.x - other.x;
		double yDifference = this.y - other.y;
		return Math.sqrt(xDifference*xDifference + yDifference*yDifference);
	}
	public void translate(Point other)
	{
		this.x+=other.x;
		this.y+=other.y;
	}
	public void mul(double coefficient)
	{
		this.x*=coefficient;
		this.y*=coefficient;
	}
}
