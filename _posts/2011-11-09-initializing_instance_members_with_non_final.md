---
layout: post
title: "Initializing Instance Members With Non-Final Methods"
excerpt: "A discussion about the common ways of member initialization and some gotchas"
tags: []
modified: 2011-11-09
comments: true
---

I recently read the Oracle documentation on <a href="http://web.archive.org/web/20140207152636/http://docs.oracle.com/javase/tutorial/java/javaOO/initial.html">“Initializing Instance Members”</a>. The article talks about the three most common ways of member initialization being assignment in the constructor, using initializer blocks and using final methods which are called from the constructor.  
<br />
Why just final methods? Well, as stated in the article:  
<br />
A final method cannot be overridden in a subclass.  
<br />
Ok, but why shouldn’t we override these initialization methods? After all I often see code like this:

{% highlight java %}
public class Super{
 
    public Super(){
        //some code here
        init();
    }
 
    public void init(){
        //initialzation code here
    }
}
 
public class Sub extends Super{
 
    public Sub(){
        super();
    }
 
    @Override
    public void init(){
        //different initialization code here
    }
}
{% endhighlight %}
They then go on to say:  
<br />
“Calling non-final methods during instance initialization can cause problems. Joshua Bloch describes this in more detail in Effective Java”  
<br />
Now, I assume that like me, when people are reading this page, usually at work, they generally don’t have their copy of Effective Java with them. So, I’m going to try my best to explain this so that its available via a simple google search.  
<br />
Let’s look at a simple example. We have a Duck and at design time we decide to make the assumption that when Ducks speak they all say “quack”. At some point in the future we decide to add a SqueakyDuck; which when speaking says “squeak”. The code for this is below:  
<br />
Disclaimer: Now, I know this is a bad example and there are better ways to achieve this behaviour, such as the Strategy Pattern, but that is a post for another day. Nevertheless, I feel this general pattern occurs in practice quite a lot.  
{% highlight java %}
public class Duck{
 
    String sound = "quack";
    protected String speech;
    public Duck(){
        //some code here
        speech = initSpeech();
    }
 
    protected void initSpeech(){
        speech = "Hi, I'm a Duck and I say " + sound;
    }
 
    public void speak(){
        System.out.println(speech);
    }
 
    public String getSound(){
        return sound;
    }
}
 
public class SqueakyDuck extends Duck{
 
    String squeakSound = "squeak";
 
    public SqueakyDuck(){
        super();
        //some code here
    }
 
    @Override
    protected void initSpeech(){
        speech = "Hi, I'm a Squeaky Duck, and I say " + squeakSound;
    }

    @Override
    protected void getSound(){
        return squeakSound;
    }
}
{% endhighlight %}
The problem arises when we run the following code:
{% highlight java %}
public static void main(String[] args){
    Duck squeaky = new SqueakyDuck();
    squeaky.speak();
    System.out.println(squeaky.getSound());
}
{% endhighlight %}
and we get the following output:
<br />
<br />
Hi, I’m a Squeaky Duck, and I say null
<br />
squeak
<br />
<br />
Chapter 12.5 “Creation of New Class Instances” of the <a href="http://web.archive.org/web/20140207152636/http://docs.oracle.com/javase/specs/#44670">Java Language Specification</a> helps to clarify why this occurs (relevant bits highlighted below):  
<br />
Just before a reference to the newly created object is returned as the result, the indicated constructor is processed to initialize the new object using the following procedure:
<br />

1. Assign the arguments for the constructor to newly created parameter variables for this constructor invocation.

2. If this constructor begins with an explicit constructor invocation of another constructor in the same class (using this), then evaluate the arguments and process that constructor invocation recursively using these same five steps. If that constructor invocation completes abruptly, then this procedure completes abruptly for the same reason; otherwise, continue with step 5.

3. **This constructor does not begin with an explicit constructor invocation of another constructor in the same class (using this). If this constructor is for a class other than Object, then this constructor will begin with an explicit or implicit invocation of a superclass constructor (using super). Evaluate the arguments and process that superclass constructor invocation recursively using these same five steps. If that constructor invocation completes abruptly, then this procedure completes abruptly for the same reason. Otherwise, continue with step 4.**

4. **Execute the instance initializers and instance variable initializers for this class, assigning the values of instance variable initializers to the corresponding instance variables, in the left-to-right order in which they appear textually in the source code for the class. If execution of any of these initializers results in an exception, then no further initializers are processed and this procedure completes abruptly with that same exception. Otherwise, continue with step 5. (In some early implementations, the compiler incorrectly omitted the code to initialize a field if the field initializer expression was a constant expression whose value was equal to the default initialization value for its type.)**

5. Execute the rest of the body of this constructor. If that execution completes abruptly, then this procedure completes abruptly for the same reason. Otherwise, this procedure completes normally.

This means that on execution of the SqueakyDuck constructor, it in turn calls super(), which in turn calls the overridden initSpeech() method, inside the SqueakyDuck class, before the SqueakyDuck instance members have been fully initialized. This means that the when initSpeech() is run the squeakySound field has the default value, which is null for all objects. However, once the SqueakyDuck object is fully initialized the squeakySound field is set to “squeak” which is why the call to getSound() returns “squeak”.