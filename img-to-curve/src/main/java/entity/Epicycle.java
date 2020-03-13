package entity;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Epicycle implements Comparable<Epicycle>
{
	private double radius;
	private double phase;
	private int angularVelocity;
	
	public Epicycle(double radius, double phase, int angularVelocity)
	{
		this.radius          = radius;
		this.phase           = phase;
		this.angularVelocity = angularVelocity;
	}
	
	public double getRadius()
	{
		return radius;
	}
	
	public double getPhase()
	{
		return phase;
	}
	
	public int getAngularVelocity()
	{
		return angularVelocity;
	}
	
	public void scaleRadius(double factor)
	{
		this.radius/=factor;
	}
	
	@Override
	public int compareTo(Epicycle epicycle)
	{
		return -Double.compare(this.radius, epicycle.radius);
	}
	
	@Override
	public String toString()
	{
		return "Epicycle{" +
		       "radius=" + radius +
		       ", phase=" + phase +
		       ", angularVelocity=" + angularVelocity +
		       "}\n";
	}
}
