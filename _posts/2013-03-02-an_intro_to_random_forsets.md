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
<br />
<br />
<center>
$$
IG(S) = H(S) - \sum\limits_{i} w_i \times H(S_i)
\\where:
\\H(S) = - \sum\limits_{c \in C}{P(c|S) \times log_2(P(c|S))}\\w_i = \frac{|S_i|}{|S|}
$$
</center>
<br />
So, at each node we wish to choose the function that maximizes the information gain. Now, returning to decision tree learning, the following algorithm, called <a href="https://en.wikipedia.org/wiki/C4.5_algorithm">C4.5</a>, is used to grow our tree:

1. If we should terminate, create leaf node. Else
2. For each attribute a
3. Find the normalized information gain from splitting on a
4. Let a_best be the attribute with the highest information gain
5. Create a decision node that splits on a_best
6. Recurse on the subsets obtained by splitting on a_best, and add those nodes as children of the current node

Returning to our example, for our terminating criterion we will stop if all data samples at the node have the same class, which is all yes or all no in our case. So given the training data, we start at the root of the tree and check, for each attribute, the information gain. For example, given the 3 data examples at the top, using the attribute $$wind$$ , we calculate the information gain as follows:
<br />
<br />
First, we calculate the entropy, $$H(S)$$ , of the whole set $$S=\{d1,d2,d3\}$$ as follows:
<br />
<center>
$$
H(S) = - \sum\limits_{c\in\{yes,no\}}P(c|S) \times log_2\left(P\left(c|S\right)\right)
$$
$$
H(S) = -\left(\frac{1}{3} \times log_2\left(\frac{1}{3}\right) + \frac{2}{3} \times log_2\left(\frac{2}{3}\right)\right)
$$
$$
H(S) = 0.91829583405
$$
</center>
Split the data into two sets based on the possible values the attribute $$wind$$ can take ($$\{weak,strong\}$$). This produces the following sets $$S_1 = \{d1,d3\}  \&  S_2 = \{d2\}$$ , where $$S_1$$ has $$wind = weak$$ and $$S_2$$ has $$wind = strong$$.
<br/>
<br />
<center>
    $$
    H(S_1) = -\left(0 + \frac{2}{2} \times log_2\left(\frac{2}{2}\right)\right) = 0
    $$
</center>
and $$w_1 = \frac{2}{3}$$ as $$S_1$$ contains two of the three training datum.
<center>
    $$
    H(S_2) = -\left(\frac{1}{1} \times log_2\left(\frac{1}{1}\right)\right) = 0
    $$
</center>
and $$w_2 = \frac{1}{3}$$.
<br />
<br />
So the information gain ($$IG$$) is:
<center>
$$
IG(S) = H(S) -\sum\limits_{i=\{1,2\}}w_i \times H(S_i)\\
IG(S) = 0.91829583405 - (0 + 0) = 0.91829583405
$$
</center>
Similarly, we check for the attributes $$weathercondition$$, $$temperature$$ and $$humidity$$, which give us information gains of $$-0.08170416595$$, $$-0.08170416595$$ and $$-0.08170416595$$ respectively. As we are trying to maximize information gain, we choose wind as the best attribute and split the data on this attribute.
<br />
<br />
We now recurse on the two subsets produced ($$S_1$$ & $$S_2$$ as above), which we can see both contain data from just one class which matches our termination criterion. So, we have now how two leaf nodes, and have built our tree.
<br />
<br />
Given our tree, given a new input $$x$$, we check the $$wind$$ attribute and if it is $$weak$$ we answer $$no$$ else if it is $$strong$$ we answer $$yes$$. Obviously this was highly simplified by the fact that we only used 3 training samples, which is hardly enough to capture the problem accurately. Nevertheless, I hope this example has made the algorithm clear.
<br />
<br />
In the second part of this post I will discuss the down side of using this approach and why we use random trees. Additionally (hopefully) I will have a walk through, with code, of a real application using random forests. The application will probably be some form of image classification, such as classifying images as either images of cats or dogs, or if I have the time perhaps I can try and tackle a where’s Wally solver.