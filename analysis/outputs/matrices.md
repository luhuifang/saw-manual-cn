# Matrices

## [Gene Expression File (GEF)](../../gao-ji-she-zhi/expression-matrix-format.md#gene-expression-file-gef)

基因表达文件 (GEF) 是一种数据管理和存储格式，旨在支持多维数据集和高计算效率。Stereo-seq 分析工作流程生成 bin GEF 和 cellbin GEF 文件。Bin GEF 文件格式是一种分层结构的数据模型，以各种 bin 大小存储一个或多个组合的基因表达矩阵。Cellbin GEF 文件格式存储每个细胞内的表达信息。每个 GEF 容器组织一个空间基因表达矩阵集合。它包括两个主要数据对象：Group 和 Dataset。数据集是数据元素的多维数组。Group 对象类似于以层次结构组织数据集和其他组的文件系统目录。

## [Gene Expression Matrix (GEM)](../../gao-ji-she-zhi/expression-matrix-format.md#gene-expression-matrix-gem)

基因表达矩阵 (GEM) 存储基因空间表达数据。SAW 在分析流程中生成多个基因表达矩阵文件，基本格式需要六列，标题行显示列名。六列分别是基因 ID、基因名称、x 坐标、y 坐标、MID 计数和 exon 计数，如果是 cellbin 数据，那么会有第七列记录细胞 ID。最大面积外接矩形区域的表达矩阵标题在列行前有多个以“#”开头的注释行，标题字段名称和字段类型在表中描述。

## 文件类型

SAW 分析流程输出的表达矩阵文件主要包括两种类型，bin GEF 和 cellbin GEF。可以通过文件后缀名来快速识别：

<table><thead><tr><th width="208">File extension</th><th>Description</th></tr></thead><tbody><tr><td><code>.gef</code></td><td><p>The feature expression matrix file in HDF5 format for visualization. It contains the MID count for each gene of each spot. A spot is a binning unit that has a fixed-sized square shape in which the expression value in this square is accumulated. By default, a visualization <code>.gef</code> includes spot sizes of bin 1, 5, 10, 20, 50, 100, 150, 200.</p><p><img src="../../img/assets/bin_size_example.png" alt=""></p></td></tr><tr><td><code>.cellbin.gef</code></td><td><p>The cellbin feature expression matrix file in HDF5 format. It contains the spatial location and area of each cell, the MID count for each gene of each cell, and the cluster the cell belongs to. In <code>.cellbin.gef</code>, the cell is the smallest data unit.<br><img src="../../img/assets/cell_bin_example.png" alt=""></p><p><br><em>Only available when the cell segmentation was done based on an microscopy image.</em></p></td></tr></tbody></table>

## 常见矩阵文件

`SAW count` 和 `SAW realign` 输出的表达矩阵文件通常为：

<table><thead><tr><th width="185">File</th><th>Description</th></tr></thead><tbody><tr><td><code>&#x3C;SN>.raw.gef</code></td><td>Feature expression matrix includes the whole information over a complete chip region. It only has bin1 expression counts. </td></tr><tr><td><code>&#x3C;SN>.gef</code></td><td>Feature expression matrix. It is also a visualization GEF that includes expression counts for bin1, 5, 10, 20, 50, 100, 150, 200.</td></tr><tr><td><code>&#x3C;SN>.tissue.gef</code></td><td>Feature expression matrix under the tissue coverage region. It is also a visualization GEF that includes expression counts for bin1, 5, 10, 20, 50, 100, 150, 200.</td></tr><tr><td><code>&#x3C;SN>.cellbin.gef</code></td><td>Cellbin feature expression matrix records the information of cells individually, including the centroid coordinate, boundary coordinates, expression of genes, and cell area.</td></tr><tr><td><code>&#x3C;SN>.adjusted.cellbin.gef</code></td><td>Cellbin expression matrix with cell border expanding, based on <code>&#x3C;&#x3C;SN>_&#x3C;stainType>_mask_edm_dis_&#x3C;distance>.tif</code>.</td></tr></tbody></table>

## 微生物相关

基于 Stereo-seq N FFPE 组织样本进行分析，在运行 `SAW count` 分析任务时，设置`--microorganism-detect` 参数，输出的微生物相关的表达矩阵文件就被保存在 `/outs/feature_expression/microorganism` 目录下，具体内容如下：

<table><thead><tr><th width="266">File</th><th>Description</th></tr></thead><tbody><tr><td><code>&#x3C;SN>.microorganism.raw.gef</code></td><td>Feature expression matrix of microorganisms includes the whole information over a complete chip region. It only has bin1 expression counts. </td></tr><tr><td><code>&#x3C;SN>.microorganism.gef</code></td><td>Feature expression matrix of microorganisms. It is also a visualization GEF that includes expression counts for bin1, 5, 10, 20, 50, 100, 150, 200.</td></tr><tr><td><code>&#x3C;SN>.host_microorganism.raw.gef</code></td><td>Feature expression matrix of microorganisms and the host includes the whole information over a complete chip region. It only has bin1 expression counts. </td></tr><tr><td><code>&#x3C;SN>.host_microorganism.gef</code></td><td>Feature expression matrix of microorganisms and the host. It is also a visualization GEF that includes expression counts for bin1, 5, 10, 20, 50, 100, 150, 200.</td></tr><tr><td><code>&#x3C;SN>.microorganism.&#x3C;classification>.gem</code></td><td><p>Feature expression matrix of a specific classification of microbes. </p><p>Classifications of microorganisms include phylum, class, order, family, genus, and species.</p></td></tr></tbody></table>
