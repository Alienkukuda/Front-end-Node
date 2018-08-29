### 一.什么是floatlayout

在讲浮动布局之前，首先要先提到两个概念—**文档流**和**文本流**，由于浮动就是让元素浮动，本质就是跳出文档流，所以了解这两个基础概念还是必要的。

何为文档流，可以笼统地解释为css中的一种定位情况，占据一定区域；而文本流则是相对文字的段位而言。明白这两个概念后，对于浮动布局的原理的理解就比较简单了。元素浮动后，那么跟在后面的元素将无视浮动前元素占的区域，直接在其**下面**布局，也就达到了浮动的效果。那么对于文本流而言呢，答案是它还是认为浮动元素占据了区域，围绕它布局，所以浮动元素并没有跳出文本流。(而定义为*absolute*、*fixed*等的元素则连文本流也会跳出这个在后会详解)

说了这么多，不如来看个例子。

```html
<div id="outofnormal">
浮动元素
</div>
<h2>Normal Content</h2>
<p>This is a paragraph of text</p>
<p>This is a paragraph of text</p>
```

![image-20180809210519374](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180809210519374.png)

如上图所示，我用检查的方式来使结构更加的清楚。可以看出文档流在浮动元素之下，而文本围绕在周围。

### 二.用在哪些地方

知道浮动的原理后，很多人会想，它有什么用呢。这里要提到*float*属性，该属性定义了元素是否浮动并往哪个方向浮动，值为*left*向左浮动，为*right*向右浮动，*none*则不浮动。拿*left*举例，浮动的元素可以向左移动，直到它的外边缘碰到包含框或另一个浮动。

一般来说这个属性总是应用于图像，是文本围绕在其周围，类似报纸报道的内容，也可使用于图文排列的风格，或者想让某些元素根据边缘边框定位，在这里不一一列举。

### 三.会造成什么问题

然而浮动布局并没有想的那么简单，使用不当会产生很多问题，懂得如何正确地使用它才是最重要的。

浮动生成一个块状元素，一般来说都要制定一个明确的宽度，不然它会尽可能的窄s，不会达到预想的效果，或者超过了一行中仅存的空间宽度，那么它就会移至下一行知道拥有足够的空间为止。这种情况就会影响到其他内联元素的布局，麻烦不必多说。

不仅如此，浮动元素会对父容器产生一种高度欺骗的现象，也就是说父容器在不设定高度的情况下不会因为浮动子元素的高度而撑开高度，可想而知当父容器中只有浮动元素时，会出现整个容器高度为0的情况，又或者，当浮动元素高度超出父容器的时候，也就会出现父容器不会自动伸高来闭合浮动元素，这些情况统称为“高度塌陷”现象。

所谓一图胜千言：

![image-20180811104155569](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180811104155569.png)

```html
<div style="height: 300px;width: 250px;padding: 50px;background-color: white">	
  <div style="border:4px solid red;">
    <img style="border:4px solid yellow;float:left;" src="img/2.jpg" />
  </div>
</div>
```



如果用一句话简洁的话来概括，可以说父容器的高度由其中**最后一个非浮动子元素**的位置决定。

### 四.（重点）怎么解决

在这之前，可事先了解[那些年我们清除过的浮动](http://www.iyunlu.com/view/css-xhtml/55.html)，希望对清除浮动有更多的了解。

解决方法，说到底可以分成两类。

#### 一、在浮动元素末尾添加空元素。

**1.添加额外标签或者使用html自身标签**

示例代码：

```html
<div style="background-color: cyan;margin-top: 20px;">
  <p style="float: left;background-color: blanchedalmond";>This is the first paragraph of 	text</p>
  <div style="clear: both"></div>
</div>
```

效果图：

![image-20180810191754381](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180810191754381.png)

亦或是使用html原有的标签，类似`<br>`,相比较`<div>`而言具备了一定的语义化， 有 clear=“all | left | right | none” 属性，代码量略微减少。

总的来说，这两种方式相对比较简单，恐怕也是初学者最容易理解也最先使用的方式之一，然而其本身并不符合语义化的思想，平白无故增加了空标签，从根本上讲破坏了结构，当项目小的时候影响不大，但当项目繁琐时，试想空标签多到自己找不到那得是多么的“悲哀”。

**2.构造伪类**

伪类代码：

```html
clearfix:after {
  content:"";
  display:block;
  clear:both;
}
<div style="height: 500px;padding-top: 20px;background-color: #ff855b">
  <div class="father-div clearfix">
    <p class="child-div">This is the first paragraph of text</p>
  </div>
</div>
```

相比较前两种方法，该方法实现了语义化，而且并未破坏结构，可以说是一种理想的方法。与前者在结尾生成块状或行内元素不同，伪类则是实现了一个内容为空的块状元素，把副作用减少到了最少。

#### 二、设置父元素为BFC

有人问怎么实现BFC呢？其实很简单，简单概括为以下几点。

- float属性设定为除了none以外的值 
- overflow属性设置为除了visible以外的值（如:hidden，auto，scroll ） 
- display 属性设置为(table-cell，table-caption，inline-block) 
- position属性设置为(absolute，fixed)
- fieldset元素

**3.父元素设置overflow：auto、hidden等属性**

示例代码：

```html
<div style="height: 500px;padding: 50px;background-color: #b4b4b4">
  <div class="father-div" style="overflow: hidden">
	<h2>父元素设置display为block-inline </h2>
	<p class="child-div">This is the first paragraph of text</p>
  </div>
</div>
```

效果图：

![image-20180810192517813](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180810192517813.png)

这些属性实现原理很类似，拿hidden举例，hidden的本意是裁减掉超出的部分，在没有明确容器高度的情况下，父容器自然要计算全部内容的高度，这个时候连浮动的元素都不例外，可以说在确定隐藏高度的同时顺带清除了浮动。

相对在元素末尾添加空元素相比，可以看出需要增加的代码量更少了，而且不会出现破坏结构这些问题。然而这种方法还是很少被使用，原因就在于对有些游览器不兼容，也许会导致部分功能失效。最主要的，它会隐藏自动换行而超出容器范围的部分，而事实上我们在构建一个网页时，经常会用到浮动，我们并不希望hidden的情况经常发生。

**4.父元素设置display：inline-block、table等属性**

示例代码：

```html
<div style="height: 500px;padding: 50px;background-color: #b4b4b4">
  <div class="father-div" style="display: inline-block">
	<h2>父元素设置display为block-inline </h2>
	<p class="child-div">This is the first paragraph of text</p>
  </div>
</div>
```

效果图：

![image-20180810193010470](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180810193010470.png)

其实inline-block模拟了浮动的部分特征，只是两者实现原理不同，浮动是元素脱离文档流，而inline-block定义的元素还存在于文档流中。正因为它是行内块状元素，这也意味着它也可以像浮动元素一样整齐排列或者靠着父容器边缘，同时并不用担心浮动产生的问题。至于display: table、display: table-cell，和inline-block类似，然而这里不做详述。

除了上述强调的高度坍塌问题外，这里不得不提一下浮动另一个局限性，当列表元素高度不一致时，就会出现如下的这种情况，原因就是某个列表元素高度不一致，另起一行的浮动元素触到了另一个浮动元素的外框。

![image-20180810205912738](/var/folders/bc/98l_bzpx6kx6kx8v7nh1v0jw0000gn/T/abnerworks.Typora/image-20180810205912738.png)

然而我在这里一直说inline-block怎么好怎么好，那么它是不是完美的呢？答案不用我说，它自然也有缺点，其中一点，当父元素想设置text-align: center让某些元素居中时，具备display: inline-block的子元素就会被影响到，而浮动元素则不会被影响到。

**5.父元素也设置为浮动**

无非就是父元素添加float属性，和以上写法类似，在此不再举例。

要说原理嘛，打个比方，父元素子元素都变成同个门派的人了，自然不会互相较量，也就不会有高度坍塌的问题。听起来，结构不会被影响，代码又简洁，又容易理解，但是一想到一直要用浮动用到结尾，想想都觉得可怕。不推荐使用。

mark一下，这是我写的第一篇正式博客的初稿，标题分的很清楚。下面是我和同事一起合作写的最终版，可以看到风格很是有趣。

[Magical portal](https://scala.cool/2018/08/febible-float-layout/)