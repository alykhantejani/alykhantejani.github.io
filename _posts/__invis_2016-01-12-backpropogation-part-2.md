---
layout: post
title: "Backpropagation Part II: The 4 Fundamental Equations"
excerpt: "A brief summary of neural networks and the derivation of the 4 fundamental equations to solve backprop"
tags: [DeepLearning, NueralNetworks, MachineLearning, Backpropagation, Calculus]
modified: 2016-01-12
comments: true
---

In the <a href = ''>previous post</a> we showed how the gradient descent method can be applied to find (locally) optimal solutions to problems. In order to use gradient descent the error in your solution, $E(X)$, must be measurable and be expressed in terms of the parameters of your algorithm, and also be differentiable with respect to these parameters. In this post we will go over the basics of neural networks, and show how gradient descent can be applied to train them i.e. showing how we can differentiate an error term with respect to the networks parameters.

##Neural Networks
<em>Note: I will give a brief overview of neural networks, focussing on the standard multi-layer perceptron for the purpose of demonstrating the backpropagation algorithm. For an in-depth discussion of the history, and extensions (to convolutional networks) and many, many examples I can highly recommend <u><a href = 'http://michaelnielsen.org/'>Michael Nielson's</a></u> free e-book: <u><a href = 'http://neuralnetworksanddeeplearning.com/'>Neural Networks and Deep Learning</a></u>.</em>
<br />
<br />
Neural networks are a family of models that were inspired by the biological neural network in the brain. A series of neurons have weighted connections to other neurons in the network. 
<br />
Following on from the example in the <a href = ''>previous post</a>, given the points, $(y_i, x_i)$, as plotted below, we would like to learn a function $f(x_i) = \hat{y}_i$ that given an $x_i$ will predict the corresponding $\hat{y}_i$ value. In the previous post, we assumed that the underlying structure of the function $f(x)$ and directly predicted the coefficients. 
<center><img src="{{ site.url }}/images/data_points.png" style='width:85%' alt="Data points (y, x)"/></center>
<center><em>Our dataset of points</em></center>
<br /> 

However, this time we will not make any underlying assumptions about $f(x)$ and will use a neural network to directly model the function. For example, we can use the network described in the figure below where we show a 4-layer neural network with 1 input ($x_i$) and 1 output ($\hat{y}_i$), where each neuron in one layer is connected to every neuron in the layer above (these are called <em>fully-connected</em> layers).

<center><img src = "{{ site.url }}/images/example_nn.png" style='width:85%' alt="An example neural network structure" />
	<br />
	<br />
	<em>An example neural network</em>
</center>
<br />
<br />
Each neuron, $i$, in layer $l$, outputs an <em>activation</em>, $a^l_i$ which is computed as a function of its <em>weighted inputs</em> and a <em>bias</em> (for an explanation of the bias term, see <a href='http://stackoverflow.com/a/2499936/225814'>this</a> great example). For example, the activation at the $1^{st}$ neuron in the $3^{rd}$ layer ($h^2_1$) is defined as:
<center>
$$
a^{l_3}_1 = \sigma\left(z^{l_3}_{1}\right) \\
where\ z^{l_3}_{1} = \Sigma^{3}_{i = 1}\left({a^{l_2}_{i}w^{l_3}_{1i}} \ + b^{l_3}_1\right) \\
$$
</center>

$z$ is called the <em>weighted input</em> as it is the weighted sum of the inputs to the neuron, and $\sigma$ is called the <em>activation function</em>. A variety of activation functions are used in practice, and we can use any that we like as long as they are differentiable (and non-linear). In this post we will use the <em>sigmoid</em> activation function, which is defined as:
<center>
$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$
</center>

In a similar fashion the output of the network, $\hat{y}_i$, is equal to the activation at the final neuron. Finally, we can calculate the error between the predictions, $\mathbf{\hat{y}} = \\{\hat{y_i}\\}$, and the ground truth, $\mathbf{y} = \\{y_i\\}$, by evaluating the error function $E(\mathbf{\hat{y}}, \mathbf{y})$, which is defined as:

<center>
	$$
	E\left(\mathbf{\hat{y}}, \mathbf{y}\right) = \frac{1}{N}\sum_{i=1}^{N}\big(\hat{y}_i - y_i\big)^2
	$$
</center> 

###Forward Calculation
Given an input, $x_i$, to calculate the predicted $\hat{y}_i$, we must move the data through the network, this is known as the forward pass, or the forward calculation. To understand how this can be done efficiently, it's important to know how, in practice, we represent data in neural networks. 
<br />
<br />
We can represent neuron activations in a layer as a vector of activations, similarly we can represent the weights and bias between layers as a matrix and a vector respectfully. For example, we can represent the $2^{nd}$ layer activations at layer, $\mathbf{a}^{l_2}$, the $3^{rd}$ layer weights, $\mathbf{W}^{l_3}$, and the $3^{rd}$ layer bias, $\mathbf{b}^{l_3}$, as:
<center>
$$
\begin{align*}
&	 \mathbf{a}^{l_2}= \begin{bmatrix}
	     a^{l_2}_1 \ a^{l_2}_2 \ a^{l_2}_3
	    \end{bmatrix}

&&	 \mathbf{W}^{l_3}=\begin{bmatrix}
	     w^{l_3}_{11} \ w^{l_3}_{12} \ w^{l_3}_{13} \\
	     w^{l_3}_{21} \ w^{l_3}_{22} \ w^{l_3}_{23} \\
	     w^{l_3}_{31} \ w^{l_3}_{32} \ w^{l_3}_{33} \\
	    \end{bmatrix}

&&	 \mathbf{b}^{l_3}=\begin{bmatrix}
	     b^{l_3}_1 \ b^{l_3}_2 \ b^{l_3}_3
	    \end{bmatrix}

\end{align*}
$$
</center>
We can then calculate the activations at the $3^{rd}$ layer, $\mathbf{a}^{l_3}$ by computing a simple matrix multiplication and addition, i.e. $\mathbf{a}^{l_3} = \sigma\left(\mathbf{z}^{l_3}\right)$ where $\mathbf{z}^{l_3} = \mathbf{a}^{l_2}\mathbf{W}^{l_3} + \mathbf{b}^{l_3}$. Following this, it's easy to see that output of the network is obtained by simply chaining a series of matrix multiplications and addition passed through a non-linear function, $\sigma$, together i.e. given the input $\mathbf{x} = [x_i]$, the ouput, $y_i$, can be calculated as follows:
<center>
$$
y_i = \sigma\left(\sigma\left(\mathbf{x}\mathbf{W}^{l_1} + \mathbf{b}^{l_1}\right)\mathbf{W}^{l_2} + \mathbf{b}^{l_2}\right)\mathbf{W}^{l_3} + \mathbf{b}^{l_3}
$$
</center>
Note, that we omit passing the output of the last layer through the sigmoid function, $\sigma$. This is because the sigmoid squashes the output to the range $[0,1]$, whereas for our application we want real-valued outputs that are not bounded.
<br />
<br />
Hopefully, it is now clear how we can use our neural network to predict output values, $y_i$, given and input, $x_i$. However, for the network to accurately model the underlying function used to generate the data, we must learn the correct values for the weights $w^{l_i}_{jk}$ and $b^{l_i}_j$.

###Backward Calculation
In order to learn the correct values for the weights, $w^{l_i}_{jk}$

###Implementation