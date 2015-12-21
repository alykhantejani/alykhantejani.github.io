---
layout: post
title: "Highlights of ICCV 2015"
excerpt: "A short summary of ICCV 2015 and my personal highlights"
tags: [Computer Vision, Machine Learning, Conferences, ICCV]
modified: 2015-11-20
comments: true
---
It's conferences season again, and this time I had the pleasure of attending the International Conference on Computer Vision (ICCV) in Santiago, Chile. I couldn't have picked a better destination myself, it was very surreal to experience 30 degree heat in the middle of winter, whilst still being able to see snowy-topped mountains in the distance.
<center>
	<img src = "{{ site.url }}/images/iccv_highlights/santiago.png" width="240px" /></td>
	<img src = "{{ site.url }}/images/iccv_highlights/Image-2.jpeg" width="240px;" style="vertical-align:bottom !important;" /></td>
	<br />
	<br />
	<em>Santiago, Chile</em>
</center>

<br />

Conferences are a great way to re-connect with old friends and possibly make some new ones whilst spending a week together discussing ideas from all aspects of computer vision and machine learning. Below are some of my highlights from the trip, as well as (in my own oppinion) some of the stand-out papers to read.

<br />

The plenary talk was given by Stephen Boyd, author of *the book* on convex optimization. Stephen was showcasing <a href='https://github.com/cvxgrp/cvxpy'>cvxpy</a>, an open-source, python-embedded modelling language for convex optimization problems of small to medium size (1-100k variables). The main idea behing cvxpy is that no tweaking of the algorithm is necessary, you just provide your cost function and constraints, and if it is convex you will get the solution. Stephen was a very entertaining speaker, and clearly very passionate about convex optimization, his main take aways are that, if you are doing convex optimization, we are almost at a state where we can treat the solution to these problems as a technology, i.e. just using software without understanding how the solution works. Cvxpy is a big step towards this becomming a technology, and I reccomend you check it out if this is an area that interests you, as it seemed extremely easy to write a solver for small convex problems. However, as you can imagine, deep learning is still the major trend within the community and these are highly non-convex problems, so we still see many papers with different tricks for convergence of these nets. 

<br />

There were also some very good demos this year, a few of my favourite were:
<ol>
<li style="padding-bottom:7px;">Scalable Color Sketch based Search of Millions of Images
	<br />
	<a href="https://www.youtube.com/watch?v=XSIpGCXgkLM">[YouTube]</a>
</li>
<li style="padding-bottom:7px;">Showcasing SegNet: A Deep Encoder-Decoder Architecture for Real-Time Road Scene Segmentation
	<br />
	<a href="http://arxiv.org/pdf/1511.00561v2.pdf">[PDF]</a> <a href="http://mi.eng.cam.ac.uk/projects/segnet/">[Demo]</a>
</li>
<li style="padding-bottom:7px;">(A shameless self plug) In the workshop on <em>Recovering 6D Object Pose</em> there was a demo of my <a href='http://www.iis.ee.ic.ac.uk/icvl/doc/ECCV2014_aly.pdf'>previous work on 3D object pose estimation</a> which was estimating object pose in the bin-picking scenario, running at a reasonable frame-rate on a laptop.
	<br />
	<a href="http://www.iis.ee.ic.ac.uk/icvl/doc/ECCV2014_aly.pdf">[PDF]</a> <a href = "https://www.youtube.com/watch?v=dh2VtnnsGuY">[YouTube]</a> <a href="http://www.iis.ee.ic.ac.uk/ComputerVision/3DPose-2015.html">[Workshop Challenges]</a>
</li>
</ol>

There were many interesting papers presented at the conference and I encourage you to check out the <a href="https://drive.google.com/file/d/0B6xUH6bgpv36cGxtSXVId0dkZjQ/view">ICCV pocket guide</a> to get a full listing. However, below is a small list of some of my favourite papers from the conference. I hope you enjoy reading them too :)
<ul>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/deep_neural_df.png" height="80px" width="80px" ></td>
				<td><em>P. Kontschieder, M. Fiterau, A. Criminisi, S. R. Bulò</em>
					<br />
					<b>Deep Neural Decision Forests</b> <em>(best paper award)</em>
					<br />
					<a href="http://research.microsoft.com/pubs/255952/ICCV15_DeepNDF_main.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/local_conv_features.png" height="80px" width="80px" style="padding-right: 10px"></td>
				<td><em>M. Paulin, M. Douze, Z. Harchaoui, J, Mairal, F. Perronnin, C. Schmid</em>
					<br />
					<b>Local Convolutional Features with Unsupervised Training for Image Retrieval</b>
					<br />
					<a href="https://hal.inria.fr/hal-01207966/document">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/delving_deep_rectifiers.png" height="80px" width="80px" ></td>
				<td><em>K. He, X. Zhang, S. Ren, J. Sun</em>
					<br />
					<b>Delving deep into rectifiers: Surpassing human level performance on ImageNet classification</b>
					<br />
					<a href="http://arxiv.org/pdf/1502.01852v1.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/frcnn.png" height="80px" width="80px" ></td>
				<td><em>R. Girshick</em>
					<br />
					<b>Fast R-CNN</b>
					<br />
					<a href="http://arxiv.org/pdf/1504.08083v2.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/unsupervised_visual_rep.png" height="80px" width="80px" ></td>
				<td><em>C. Doersch, A. Gupta, A. Efros</em>
					<br />
					<b>Unsupervised Visual Representation Learning by Context Prediction</b>
					<br />
					<a href="http://arxiv.org/pdf/1505.05192v2.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/faces.png" height="80px" width="80px" ></td>
				<td><em>G. Hu, Y. Yang, J. Kittler, W. Christmas, S. Li, T. Hospedales</em>
					<br />
					<b>When Face Recognition meets with Deep Learning: an Evaluation of Convolutional Nueral Networks for Face Recognition</b>
					<a href="http://arxiv.org/pdf/1504.02351v1.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
</ul>

<br />

Additonally, although not presented at ICCV, these are some other papers that were presented recently (at NIPS) or have recently popped up on arxiv that I think are very interesting.

<ul>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/deep_res_learning.png" height="80px" width="80px" ></td>
				<td><em>K. He, X. Zhang, S. Ren, J. Sun</em>
					<br />
					<b>Deep Residual Learning for Image Recognition</b> <em>(ImageNet and COCO winners 2015)</em>
					<br />
					<a href="http://arxiv.org/pdf/1512.03385v1.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/data_dependent_initialization.png" height="80px" width="80px" ></td>
				<td><em>P. Krähenbühl, C. Doersch, J. Donahue, T. Darrell</em>
					<br />
					<b>Data-Dependent Initializations of Convolutional Neural Networks</b>
					<br />
					<a href="http://arxiv.org/pdf/1511.06856v1.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/faster_rcnn.png" height="80px" width="80px" ></td>
				<td><em>S. Ren K. He, R. Girshick, J. Sun</em>
					<br />
					<b>Faster R-CNN</b>
					<br />
					<a href="http://arxiv.org/pdf/1506.01497v2.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
	</li>
	<li style='list-style-type: none;'>
		<table>
			<tr>
				<td style = "width:80px; height:80px; padding-right:10px;"><img align="left" src="{{ site.url }}/images/iccv_highlights/reception.png" height="80px" width="80px" ></td>
				<td><em>C. Szegedy, V. Vanhoucke, S. Ioffe, J. Shlens</em>
					<br />
					<b>Rethinking the Inception Architecture for Computer Vision</b>
					<br />
					<a href="http://arxiv.org/pdf/1512.00567v3.pdf">[PDF]</a>
				</td>
			</tr>
		</table>
	</li>
</ol>