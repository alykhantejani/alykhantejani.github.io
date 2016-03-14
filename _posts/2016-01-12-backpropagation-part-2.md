---
layout: post
title: "Backpropagation Part II: The 4 Fundamental Equations"
excerpt: "A brief summary of neural networks and the derivation of the 4 fundamental equations to solve backprop"
tags: [DeepLearning, NueralNetworks, MachineLearning, Backpropagation, Calculus]
modified: 2016-01-12
comments: true
---

In the <a href = ''>previous post</a> we showed how the gradient descent method can be applied to find good solutions to problems. In order to use gradient descent the error in your solution, $E(X)$, must be measurable and be expressed in terms of the parameters of your algorithm, and also be differentiable with respect to these parameters. In this post we will go over the basics of neural networks, and show how gradient descent can be applied to train them i.e. showing how we can differentiate an error term with respect to the networks parameters.

##Neural Networks
<em>Note: I will give a brief overview of neural networks, focussing on the standard multi-layer perceptron for the purpose of demonstrating the backpropagation algorith. For an in-depth discussion of the history, and extensions (to convolutional networks) and many, many examples I can highly recommend <u><a href = 'http://michaelnielsen.org/'>Michael Nielson's</a></u> free e-book: <u><a href = 'http://neuralnetworksanddeeplearning.com/'>Neural Networks and Deep Learning</a></u>.</em>
<br />
<br />
Neural networks are a family of models that were inspired by the biological neural network in the brain. A series of neurons have weighted connections to other neurons in the network. For example, in the figure below, we show a 3-layer network with 2 inputs and 3 outputs, where each neuron in one layer is connected to every neuron in the layer above (these are called <em>fully-connected</em> layers).
<center><img src = "{{ site.url }}/images/example_nn.png" style='width:85%' alt="An example neural network structure" />
	<br />
	<br />
	<em>An example neural network</em>
</center>
<br />
<br />
Each neuron, $i$, in layer $l$, outputs an <em>activation</em>, $a^l_i$ which is computed as a function of its <em>weighted inputs</em> and a <em>bias</em> (for an explanation of the bias term, see <a href='http://stackoverflow.com/a/2499936/225814'>this</a> great example). For example, the activation at neuron $h_1$ is defined as:
<center>
$$
a^{l_2}_1 = \sigma\left(z^{l_2}_{1}\right) \\
where\ z^{l_2}_{1} = x_1w^{l_2}_{11} + x_2 w^{l_2}_{12} + b^{l_2}_1
$$
</center>

Where $z$ is called the <em>weighted input</em> and $\sigma$ the <em>activation function</em>. A variety of activation functions can be used in practice, and we can use any that we like as long as they are differentiable (and ideally non-linear). In this post we will mainly focus on the <em>sigmoid</em> activation function, which is defined as:
<center>
$$
\sigma(z) = \frac{1}{1 + e^{-z}}
$$
</center>

We can then calculate the outputs of the network $a^{l_3}_1$ ($y_1$) and $a^{l_3}_2$ $(y_2)$ in a similar fashion. In practice, the neuron activations are represented as vectors and the weight values between layers as matrices. For example, the input layer, $\mathbf{X}$ and the firs layer weights, $\mathbf{W^{l_2}}$ can be defined as:
<center>
$$
\begin{align*}
&	 \mathbf{X}=\begin{bmatrix}
	     x_1 \\
	     x_2 \\
	    \end{bmatrix}

	    &&	 \mathbf{W^{l_2}}=\begin{bmatrix}
	     w^{l_2}_{11} \ w^{l_2}_{12} \\
	     w^{l_2}_{21} \ w^{l_2}_{22} \\
	     w^{l_2}_{31} \ w^{l_2}_{32} \\
	    \end{bmatrix}
\end{align*}
$$
</center>
We can calculate the first layer activations $(h_i)$ by a simple matrix multiplication 