---
layout: post
title: "Double Brace Initialization"
excerpt: "A look under the covers of Java's double brace initialization"
tags: []
modified: 2011-11-14
comments: true
---

Double brace initialization is a shorthand way to initialize objects in Java, which is most commonly used when initializing collections like so:

{% highlight java %}
List<String> names = new LinkedList<String>(){ {
    add("Bob");
    add("Pam");
    add("Aly");
} };
{% endhighlight %}
Which is a nicer, slightly more concise way of writing:
{% highlight java %}
List<String> names = new LinkedList<String>();
names.add("Bob");
names.add("Pam");
names.add("Aly");
{% endhighlight %}

So, what exactly does double brace initialization do under the covers? Well, the first set of braces creates an anonymous class that extends the class you are trying to instantiate. The second set creates an initialization block for this anonymous class. This means that the initialization block can refer to any public/protected fields and methods in the base type. So, this is not just a bit of syntactic sugar to populate collections on initialization, in fact, this technique can be used with any object.
<br />
<br />
There are however a few things to note before you use this technique:
<br />
<br />
If your object has a complicated equals method that depends on the type, class name or private fields then you probably want to avoid using double brace initialization. This is because the new type that is created will have a different equals method and may fail on .equals() checks.
<br />
<br />
The second gotcha is slightly more subtle and involves serialization. When classes implement the Serializable interface (as do most of the Collections in the Collections API) they have to provide a serialVersionUID and if they don’t the JVM will create one for them. The serialVersionUID is used as a version control mechanism for Java serialization. This is an important topic, and one for another blog post, but it is important to note that changing it can cause serialization on the client side to fail.
<br />
<br />
Now, when you use double brace initialization without explicitly adding the same serialVersionUID as the base type (which would defeat point of the nice shorthand syntax) the JVM will generate a serialVersionUID for the new anonymous type. The generated serialVersionUID can be based on the fields as well as the class name which is different for the anonymous type. This will lead to serialization conflicts, so if you are serializing you object, you will want to avoid this shorthand syntax.
<br />
<br />
**—-------------UPDATE-14-11-2011—-------------**  
<br />
A third gotcha, as pointed out by a friend of mine, Viral Shah, is that when the anonymous class is created, it implicitly gets a reference to the surrounding class which can be accessed with the Person.this syntax as shown below:
{% highlight java %}
public class Person{
  public String name = "Aly";
  List<String> favouriteNames = new LinkedList(){ {
    add(Person.this.name);
    add("Viral");
  } };
}
{% endhighlight %}
Whilst this implicit reference looks harmless, it can cause two subtle but relevant issues.
<br />
<br />
The first is that as long as a reference to the favouriteNames list is live, in any object, a reference to the Person object will be kept alive and thus consume heap space.
<br />
<br />
The second issue relates to (surprise, surprise) serialization. As the anonymous class has an implicit reference to the outer class, when the anonymous object is serialized it will (try to) serialize the Person object as well. Now, using the example above, Person does not implement the Serializable interface. So trying to serialize it, directly or via serializing the favouriteNames list, will throw a java.io.NotSerializableException exception. Additionally, this can not be avoided by using the transient keyword, as the reference is implicit and therefore we cannot mark it as transient.