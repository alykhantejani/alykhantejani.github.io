---
layout: post
title: "Backpropagation Part II: The 4 Fundamental Equations"
excerpt: "A brief summary of neural networks and the derivation of the 4 fundamental equations to solve backprop"
tags: [DeepLearning, NueralNetworks, MachineLearning, Backpropagation, Calculus]
modified: 2016-01-12
comments: true
---

In the <a href = ''>previous post</a> we showed how the gradient descent method can be applied to find good solutions to problems. In order to use gradient descent the error in your solution, $E(X)$, must be measurable and be expressed in terms of the parameters of your algorithm, and also be differentiable with respect to these parameters. In this post we will go over the basics of neural networks, and show how gradient descent can be applied to train them i.e. showing how we can differentiate an error term with respect to the networks parameters.

#Neural Networks
<em>Note: I will give a brief overview of neural networks, focussing on the standard multi-layer perceptron for the purpose of demonstrating the backpropagation algorith. For an in-depth discussion of the history, and extensions (to convolutional networks) and many, many examples I can highly recommend <a href = 'http://michaelnielsen.org/'>Michael Nielson's</a> free e-book <a href = 'http://neuralnetworksanddeeplearning.com/'>Neural Networks and Deep Learning</a>.</em>
<br />
<br />
Neural networks are a family of models that were inspired by the biological neural network in the brain. A series of neurons are connected to other neurons by weighted connections. For example, in the figure below, there is a 3-layer network with 2 inputs and 3 outputs, where each neuron in one layer is connected to each neuron in the layer above (these are called <em>fully-connected</em> layers).
<center><img src = "{{ site.url }}/images/example_nn.png" style='width:85%' alt="An example neural network structure" />
	<br />
	<br />
	<em>An example neural network</em>
</center>