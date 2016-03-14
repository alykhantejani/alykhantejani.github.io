---
layout: post
title: "AlphaGo - A step in the right direction for AI"
excerpt: "A guest post I wrote for the <a href = 'https://blippar.com/en/blog/2016/03/14/alphago-step-right-direction-artificial-intelligence/'>Blippar blog</a> on the recent success of <a href='https://deepmind.com/alpha-go.html'>AlphaGo</a>"
tags: [Machine Learning, Go, AlphaGo, Oppinion]
modified: 2016-03-14
comments: true
---
<em>This is a guest post I wrote for the <a href = 'https://blippar.com/en/blog/2016/03/14/alphago-step-right-direction-artificial-intelligence/'>Blippar blog</a> on the recent success of <a href='https://deepmind.com/alpha-go.html'>AlphaGo</a>, posting here for completeness :)</em>

<center>
	<img src = "{{ site.url }}/images/gogame.jpg" width="100%" style="vertical-align:bottom !important;" /></td>
	<br />
	<br />
</center>

11th May 1997 marks a significant day in the history of AI. On this day IBM’s <a href='https://en.wikipedia.org/wiki/Deep_Blue'>Deep Blue</a> became the first computer program to beat a reigning world champion in a six-game Chess match. Almost 19 years later, on the 12th March 2016, <a href='https://deepmind.com'>Google DeepMind’s</a> <a href='https://deepmind.com/alpha-go.html'>AlphaGo</a> has defeated <a href='https://en.wikipedia.org/wiki/Lee_Sedol'>Lee Sedol</a>, one of worlds best best Go players, in a best-of-five game, a feat many researchers believed was still a decade away.
<br />
<br />
Go, like Chess, is a zero-sum, perfect information game that dates back 2,500 years to ancient China. Despite its relatively simple rules and straight forward objective, try to surround territory and try to avoid being surrounded, Go is an extremely complex game. For example, the number of possible games of Go is $$\sim10^{700}$$ , far more than the number of atoms in in the observable universe ($$\sim10^{80}$$), ruling out any brute-force approaches. This complexity is the reason it has taken 19 years to go from Chess to Go, and even that is a remarkable feat.
<br />
<br />
AlphaGo is based on deep neural networks, a technique which has become very popular in the machine learning community in the last few years. At a high level, AlphaGo first learnt to play Go to an expert level, by learning from publically available game history of experienced players. Once it had achieved a high-level of play, AlphaGo then played against itself many millions of times and learnt from it’s own mistakes, to reach super-human levels, or at least enough to convincingly beat one of the worlds best human players.
<br />
<br />
The most unusual and beautiful thing about watching AlphaGo play was that it made many moves that would be considered weird and unorthodox, yet still came out on top. It is important to remember that AlphaGo is trained with one objective, and that is to win the game. AlphaGo is not concerned about winning convincingly, and furthermore AlphaGo has learnt to achieve this objective from the raw data, meaning it has never been taught any commonly known strategies. This approach to learning allowed AlphaGo to develop its own strategies and insights, and is what makes watching it so fascinating and playing against it so difficult.
<br />
<br />
It’s no doubt that this is a monumental achievement for the AI community as a whole, but it’s important for us to remember whilst AlphaGo may be a superior Go player than the amazing Lee Sedol, when it comes to absolutely everything else, Lee Sedol is infinitely better than AlphaGo. These results are an amazing achievement and everybody involved should feel extremely proud, this is definitely a huge step toward true AI. However, for all the Skynet-fearing humans out there, worry not we still have a long, long way to go before the machines take over. 