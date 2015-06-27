---
layout: post
title: "An Introdution To Random Forests: The Theory"
excerpt: "A brief introduction to random forests theory, with a small example"
tags: []
modified: 2013-03-02
comments: true
---

It’s been a while since I’ve blogged, especially about anything computer science related, so here goes.
<br />
<br />
This is going to be a two part introduction to the machine learning technique/framework called <a href="http://en.wikipedia.org/wiki/Random_forest">Random Forests</a>. Random forests the have gained much popularity in recent years owing to it’s ability to handle extremely large training data efficiently as well as provide O(n) test time efficiency.
<br />
<br />
Before we can talk about random forests we must understand decision trees, and decision tree learning. I feel that it’s much easier to learn through example, so I will go through a simple one from the book: <a href="http://www.amazon.co.uk/MACHINE-LEARNING-Mcgraw-Hill-International-Edit/dp/0071154671/ref=la_B000APT5O2_1_1?ie=UTF8&qid=1361650143&sr=1-1">Machine Learning by Tom Mitchell</a>.
<br />
<br />
The goal is to be able to predict whether or not to play tennis on a Saturday morning given the following attributes $$\{weatheroutlook, temperature, humidity, wind\}$$. In this example we will be performing supervised learning, which is where we are given labelled training data. Going back to our example, the labelled training would look something like this:
<br />
<br />
Note:The labels are the playTennis column (yes,no).
<br />
<style>
    table{
        border-collapse: collapse;
        border-spacing: 0;
        background-color: #e8e8ee;
        border:2px solid rgba(255, 255, 255, 0.6);
    }
    th{
        padding:5px;
    }

    td{
        padding:5px;
    }    
    tr{

        border-top:1px solid rgba(255, 255, 255, 0.6);
        border-bottom:1px solid rgba(0, 0, 0, 0.0980392);
    }
</style>
<table>
    <tr>
        <th>Data ID</th>
        <th>Weather Condition</th>
        <th>Temperature</th>
        <th>Humidity</th>
        <th>Wind</th>
        <th>PlayTennis</th>
    </tr>
    <tr>
        <td><center>d1</center></td>
        <td><center>Sunny</center></td>
        <td><center>Hot</center></td>
        <td><center>High</center></td>
        <td><center>Weak</center></td>
        <td><center>No</center></td>
    </tr>
    <tr>
        <td><center>d2</center></td>
        <td><center>Sunny</center></td>
        <td><center>Hot</center></td>
        <td><center>Normal</center></td>
        <td><center>Strong</center></td>
        <td><center>Yes</center></td>
    </tr>
    <tr>
        <td><center>d3</center></td>
        <td><center>Rain</center></td>
        <td><center>Mild</center></td>
        <td><center>Normal</center></td>
        <td><center>Weak</center></td>
        <td><center>No</center></td>
    </tr>
</table>

From this data we wish to build a decision tree which, such that for an input $$x=\{weatheroutlook, temperature, humidity, wind\}$$ we can follow a path to a leaf node which contains the answer $$yes,no$$.
<br />
<br />
In order for us to reach the correct leaf node, at each non-leaf node (called <em>split nodes</em>), a function $$g(x)$$ is evaluated on the input and based on the result we branch either right or left until we reach a leaf node which will contain the result (to play tennis or not).
<br />
<br />
The question now is, what qualities should the functions $$g(x)$$ have and how do we generate a good function, $$g(x)$$, using the training data?
<br />
<br />
Well, Ideally we would just have one split node which would contain a test function that managed to split the training data into two sets, $$S_i$$ and $$S_j$$, such that all members $$x_i \in S_i$$ have attribute $$playTennis = No$$ and $$x_j \in S_j$$ have attribute $$playTennis = Yes$$.
<br />
<br />
This situation may arise in very simple problems, or training data that doesn’t fully represent the problem. For example, look at the graph below, it shows that the data points can easily be split into two classes by the simple function $$f(x) = x>5$$. However, in real life situations data is seldom separated this easily, in fact real data is rarely linearly separable and can possibly only be split by a high dimensional hyperplane represented by a very complex function. It is, in fact, the combination of the simple split node tests, that together form a highly non-linear separation of the data in to the desired classes.
<br />
<br />
<img src="{{ site.url }}/images/clusters.png" alt="An example of linearly seperable data."/>
<center><em>An example of linearly seperable data.</em></center>
<br />
<br />
Even though it is unlikely that just one split function will be able to partition the data perfectly, I hope it has become clear that we would like a split function that maximizes this separation. In fact, we wish to maximize the information gain at each split node. The information gain of the function at a split node is a measure of much the function decreases the uncertainty of the class label in the data. For example, given data $$\{a,a,a,a,b,b,b\}$$ , a split function that splits the data into $$\{b,b,b\} \& \{a,a,a,a\}$$ would have a higher information gain than one that splits it into $$\{a,a,b,b\} \& \{a,a,b\}$$ as clearly the uncertainty of class label is lower in the sets produced by the first split than the second.
<br />
<br />
More formally, information gain is defined as the change in entropy ($$H$$) from a prior state (the training data at the node, $$S$$) to a new state (the subsets generated, $$S_i$$). This is denoted by the following formula (in this case we are using the Shannon Entropy as our measure):
<br />
<br />
<b>note:</b> $$C$$ is the set of all classes, in our example this is $$\{yes,no\}$$. 

