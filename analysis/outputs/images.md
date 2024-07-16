# Images

## 自动图像算法处理

如果在启动  `SAW count` 或 `SAW realign` 分析时加入了图像数据，图像相关的结果文件将被保存在`/outs/image` 目录下，具体内容取决于图像 QC 结果和手动处理信息。

<table><thead><tr><th width="217">File</th><th>Discription</th></tr></thead><tbody><tr><td><code>*_regist.tif</code></td><td>The panoramic image, having been registered with the raw expression matrix, is from staining layers in TIFF format.</td></tr><tr><td><code>*_tissue_cut.tif</code></td><td>Tissue segmentation result of the registered panoramic image.</td></tr><tr><td><code>*_mask.tif</code></td><td>Cell segmentation result of the registered panoramic image.</td></tr><tr><td><code>*_mask_edm_dis_10.tif</code></td><td>The result of the cell border expanding is based on the cell segmentation image. <code>*_mask.tif</code>. <code>dis_10</code> represents the expansion of 10 pixels. </td></tr></tbody></table>

对于每个图像文件类型，这里以一个小鼠全脑样本为例进行展示：

<figure><img src="../../img/assets/ssDNA_regist.png" alt="" width="563"><figcaption><p>Registered panoramic image</p></figcaption></figure>

<figure><img src="../../img/assets/ssDNA_tissueCut.png" alt="" width="563"><figcaption><p>Tissue segementation in purple</p></figcaption></figure>

<figure><img src="../../img/assets/ssDNA_cellseg.png" alt="" width="563"><figcaption><p>Cell segmentation</p></figcaption></figure>

<figure><img src="../../img/assets/ssDNA_cellseg_adjusted.png" alt="" width="563"><figcaption><p>Adjusted cell segmentation</p></figcaption></figure>

## 无图流程

如果在启动  `SAW count` 或 `SAW realign` 分析时没有加入图像数据，或者图像 QC 结果为失败，分析流程会基于表达矩阵进行组织分割。

<table><thead><tr><th width="217">File</th><th>Discription</th></tr></thead><tbody><tr><td><code>bin1_img_tissue_cut.tif</code></td><td>Tissue segmentation result of the expression data.</td></tr></tbody></table>

这里以一个小鼠小肠样片为例进行展示：

<div align="center">

<figure><img src="../../img/assets/heatmap.png" alt="" width="563"><figcaption><p>Heatmaop of expression matrix</p></figcaption></figure>

</div>

<figure><img src="../../img/assets/1716170094750 (2).jpg" alt="" width="563"><figcaption><p>Tissue segementation based on expression data</p></figcaption></figure>
