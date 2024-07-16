# count 输出结果

## 目录概览



`SAW count` 分析任务通常在工作目录下开启，在该目录下，将找到一个名为 `--id` 或 `--sn`（当`--id`参数没有启用时）的文件夹。输出结果依据数据类型被分类，主要文件被保存在 `/outs`下。

分析流程输出的具体文件取决于：

* SAW软件的版本
* 分析流程的选择，`SAW count` 或 `SAW realign`
* 是否加入显微镜图像进行分析
* 特定的分析参数设置
* ...

## 输出文件列表

完成 Stereo-seq T FF 和 Stereo-seq N FFPE 组织样本的`SAW count`分析任务后，可以在 `outs/` 目录下找到以下文件：

<table><thead><tr><th width="303">Directory/File Name</th><th>Description</th></tr></thead><tbody><tr><td><strong><code>bam/</code></strong></td><td>Files in BAM format.</td></tr><tr><td><code>annotated_bam/</code></td><td>BAM file after alignment and annotation.</td></tr><tr><td><code>&#x3C;SN>.*.bam</code></td><td>Indexed BAM file containing position-sorted reads mapped to CIDs, aligned to the genome, and annotated with GTF/GFF.</td></tr><tr><td><code>&#x3C;SN>.*.bam.csi</code></td><td>Index for <code>&#x3C;SN>.*.bam</code>. </td></tr><tr><td><strong><code>image/</code></strong></td><td>Images are generated from automatic or manual workflows.</td></tr><tr><td><code>&#x3C;SN>_&#x3C;stainType>_regist.tif</code></td><td>The panoramic image after the registration with <code>&#x3C;SN>.raw.gef</code> matrix.</td></tr><tr><td><code>&#x3C;SN>_&#x3C;stainType>_tissue_cut.tif</code></td><td>The tissue segmentation image, based on the aligned panoramic image.</td></tr><tr><td><code>&#x3C;SN>_&#x3C;stainType>_mask.tif</code></td><td>The cell segmentation image, based on the aligned panoramic image.</td></tr><tr><td><code>&#x3C;SN>_&#x3C;stainType>_mask_edm_dis_&#x3C;distance>.tif</code></td><td>The adjusted image, based on the cell segmentation image</td></tr><tr><td><strong><code>feature_expression/</code></strong></td><td>Feature expression matrices in HDF5 format at different dimensions.</td></tr><tr><td><code>&#x3C;SN>.raw.gef</code></td><td>Feature expression matrix includes the whole information over a complete chip region. It only has bin1 expression counts. </td></tr><tr><td><code>&#x3C;SN>.tissue.gef</code></td><td>Feature expression matrix under the tissue coverage region. It is also a visualization GEF that includes expression counts for bin1, 5, 10, 20, 50, 100, 150, 200.</td></tr><tr><td><code>&#x3C;SN>.cellbin.gef</code></td><td>Cellbin feature expression matrix records the information of cells individually, including the centroid coordinate, boundary coordinates, expression of genes, and cell area.</td></tr><tr><td><code>&#x3C;SN>.adjusted.cellbin.gef</code></td><td>Cellbin expression matrix with cell border expanding, based on <code>&#x3C;SN>_&#x3C;stain_type>_mask_edm_dis_&#x3C;distance>.tif</code>.</td></tr><tr><td><code>&#x3C;SN>.merge.barcodeReadsCount.txt</code></td><td>A mapped CID list file with read counts for each CID, including three columns (x, y, count).</td></tr><tr><td><code>&#x3C;SN>_raw_barcode_gene_exp.txt</code></td><td>An annotated list file with the information of coordinate, gene, MID, read counts, which is prepared to be a sampling file that performs sequence saturation.</td></tr><tr><td><strong><code>analysis/</code></strong></td><td>Secondary analysis files.</td></tr><tr><td><code>&#x3C;SN>.bin200_1.0.h5ad</code></td><td><p>An AnnData H5AD records preprocessing, filtering, normalization, dimensionality reduction, clustering and differential expression analysis, based on <code>&#x3C;SN>.tissue.gef</code>. </p><p>This output H5AD is named in the format of <code>&#x3C;SN>.&#x3C;binN>_&#x3C;leiden_res>.h5ad</code>. In the file name, <code>&#x3C;SN></code> stands for the Stereo-seq chip serial number, <code>&#x3C;N></code> for bin size, and <code>&#x3C;leiden_res></code> for the resolution of Leiden clustering.</p></td></tr><tr><td><code>bin200_marker_features.csv</code></td><td>Format-integrated differential expression analysis results, using <code>&#x3C;SN>.tissue.gef</code> of bin200.</td></tr><tr><td><code>&#x3C;SN>.cellbin_1.0.h5ad</code></td><td>An AnnData H5AD records preprocessing, filtering, normalization, dimensionality reduction, clustering and differential expression analysis, using <code>&#x3C;SN>.cellbin.gef</code>.</td></tr><tr><td><code>cellbin_marker_features.csv</code></td><td>Format-integrated differential expression analysis results, using <code>&#x3C;SN>.cellbin.gef</code>.</td></tr><tr><td><code>&#x3C;SN>.cellbin_1.0.adjusted.h5ad</code></td><td>An AnnData H5AD records preprocessing, filtering, normalization, dimensionality reduction, clustering and differential expression analysis, using <code>&#x3C;SN>.adjusted.cellbin.gef</code>.</td></tr><tr><td><code>cellbin_adjusted_marker_features.csv</code></td><td>Format-integrated differential expression analysis results, using <code>&#x3C;SN>.adjusted.cellbin.gef</code>.</td></tr><tr><td><strong><code>&#x3C;SN>.report.tar.gz</code></strong></td><td>Analysis summary report of metrics and plots in HTML format.</td></tr><tr><td><code>report.html</code></td><td>HTML file, involved in <code>&#x3C;SN>.report.tar.gz</code>.</td></tr><tr><td><strong><code>visualization.tar.gz</code></strong></td><td>StereoMap visualization file to presentation and manual processing.</td></tr><tr><td><code>&#x3C;SN>.stereo</code></td><td>A manifest file in JSON format includes experiment and pipeline information, basic analysis statistics, and references to image and spatial matrix files in the SAW output visualization file folder.</td></tr></tbody></table>

## `visualization.tar.gz`

可视化压缩文件内集成了 **StereoMap** 展示所需的文件，一个解压后的示例文件如下：

```
visualization
├── C04144D5.adjusted.cellbin.gef
├── C04144D5.bin200_1.0.h5ad
├── C04144D5.cellbin_1.0.adjusted.h5ad
├── C04144D5.rpi
├── ssDNA_matrix_template.txt
├── C04144D5_SC_20240509_174202_4.0.0.tar.gz
├── C04144D5.stereo
└── C04144D5.tissue.gef
```

### `.stereo`

`.stereo` 是一个JSON格式的统领文件，里面记录了：

* SAW分析流程的基本信息
* 组织样本的相关信息
* 基本分析统计结果
* StereoMap所需的图像相关和矩阵相关的文件信息

_\*文件详细介绍在 “输出结果” 下的各部分说明中可以找到_
