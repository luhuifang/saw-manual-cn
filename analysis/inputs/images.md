# 显微镜图像

## **类型和格式**

**SAW 支持三种组合的显微镜图像输入:**

* 核染色图像
* 核染色 + 免疫荧光图像
* H\&E染色图像

## 核染色图像

核染色在组织切片中标记细胞没有偏差，对于确定组织区域和细胞位置非常有价值。STOmics 的研发团队比较和测试了多种商业化的染色试剂，发现 ssDNA 染色对下游 mRNA 捕获率的影响最小， DAPI 染料是一种常用的核染色剂，对染色细胞核具有高度特异性，可以与其它荧光试剂一起使用。Stereo-seq 实验流程和生信分析工具同时兼容了 ssDNA 和 DAPI 两种核染色方法，这两种染色方法都能够可视化展示轨迹线。

<figure><img src="../../img/assets/ssDNA.png" alt="" width="375"><figcaption><p>ssDNA</p></figcaption></figure>

## 核染色 + 免疫荧光图像

免疫荧光（IF）是一种广泛使用的基于图像，可视化展示细胞中蛋白质组的亚细胞分布的技术。例如，细胞核可以用DAPI染色，而T细胞可以通过CD3识别。多重免疫荧光（mIF）可以标记在组织切片上通过荧光显微镜同时扫描。Stereo-seq生化流程和生信分析工具同时支持DAPI和最多6个用户定义的IF兼容，从而实现对组织样本的更多空间研究。

<figure><img src="../../img/assets/DAPI.png" alt="" width="375"><figcaption><p>DAPI</p></figcaption></figure>

<figure><img src="../../img/assets/AKAP3_IF.png" alt="" width="375"><figcaption><p>APAK3_IF</p></figcaption></figure>

<figure><img src="../../img/assets/TESK2_IF.png" alt="" width="375"><figcaption><p>TESK2_IF</p></figcaption></figure>

## H\&E图像

苏木素-伊红（H\&E染色）染色是一种常用的组织染色方法，被称为医学诊断和病理学的研究的金标准。苏木素主要染色细胞核呈现蓝紫色，而伊红主要以不同深浅的粉红色染色细胞质和细胞外基质。通过Stereo-seq生成的空间表达矩阵与H\&E染色图像相结合，可以将细胞的形态与空间定位的特征表达关联起来。组织学图像和特征矩阵结合的共表达分析增加了组织切片所能提供的信息量。

<figure><img src="../../img/assets/H&#x26;E.png" alt="" width="375"><figcaption><p>H&#x26;E</p></figcaption></figure>

## 图像类型和格式

如下为 StereoMap 和 SAW 支持的数据格式说明：

<table><thead><tr><th width="226">图像类型</th><th width="186">图像格式</th><th width="94">放大倍率</th><th>Stereo-seq 芯片尺寸</th></tr></thead><tbody><tr><td>核染色图像，比如：ssDNA或者 DAPI</td><td>8 或 16 位的单张灰度图像</td><td>10X</td><td>&#x3C;=2 cm x 3 cm</td></tr><tr><td><p>核染色+免疫荧光图像</p><p>比如：DAPI +最多 6 个IF的图像</p></td><td>8 或 16 位的单张灰度图像</td><td>10X</td><td>&#x3C;= 1 cm x 1 cm</td></tr><tr><td>苏木精-伊红（H&#x26;E）染色图像</td><td>24位深的彩图</td><td>10X</td><td>&#x3C;= 1 cm x 1 cm</td></tr></tbody></table>

Stereo-seq 芯片表面具有周期性的轨迹线（水平和垂直轨迹线），在空间表达的热图上会显示为狭窄的线条，因轨迹线区域是没有捕获探针的，可以辅助矩阵跟图像的对齐。为最大程度地减小其对下游 mRNA 捕获率的影响并提高显微镜图像中轨迹线的可见性，设计了 Stereo-seq 技术的组织染色和成像标准操作规程（SOP）。因在基因热图和显微镜图像上同时可以看到这些轨迹线，因此这些线条可以用作图像对齐的位置标记。

以下是图像和热图上的轨迹线示例。

{% hint style="info" %}
展示的图像已经过调整，以便轨迹线可以清晰的可视化。
{% endhint %}

| 荧光图像上的轨迹线                                                                                              | 彩色图像上的轨迹线                                                                          | 表达热图上的轨迹线                                                                         |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <p><img src="../../img/assets/image (58).png" alt="" data-size="original"></p><p><br>轨迹线为黑色线条</p> | <p><img src="../../img/assets/image (59).png" alt=""><br></p><p>轨迹线为浅白色线条</p> | <p><img src="../../img/assets/image (55).png" alt=""><br></p><p>轨迹线为黑色线条</p> |

SAW 软件嵌入了自动化图像处理算法，用于识别组织和细胞的边界，并在Stereo-seq 芯片上检测轨迹线，以便将图像与特征表达矩阵对齐。如果无法检测到轨迹线或组织/细胞边界不清晰，可能需要手动处理协助。

