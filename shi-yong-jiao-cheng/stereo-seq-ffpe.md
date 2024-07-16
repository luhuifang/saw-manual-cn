# Stereo-seq FFPE 分析

本教程将指导你如何使用 `SAW count`  进行任务分析，演示数据来自 Stereo-seq 芯片捕获的 FFPE （福尔马林固定，石蜡包埋）小鼠全脑组织样本。

## 基本要求

为顺利运行 `SAW count`流程，需要先确认：

* 熟悉 Linux 系统；
* 熟悉运行命令行工具；
* 确保计算系统满足[最低配置要求](../download-center.md#xi-tong-pei-zhi-yao-qiu)。&#x20;

{% hint style="info" %}
在运行分析流程之前，确保计算环境中有**存储空间充足**，以及运行账号有**足够的权限等级**。
{% endhint %}

## SAW count 流程概述&#x20;

使用 `SAW count` 分析 FFPE 组织样本的 Stereo-seq 测序数据。&#x20;

启动分析任务前，通常需要准备好以下文件：

* 芯片 mask 文件（记录 Stereo-seq 芯片的 CID 信息）
* FASTQ 测序数据（Stereo-seq 测序下机数据）
* reference 文件（参考基因组的索引文件，根据物种进行选择）
* 一张或多张显微镜图像（`TIFF` 或来自 **StereoMap** 的图像 `.tar.gz`）

{% hint style="info" %}
来自 **StereoMap** 的压缩图像`.tar.gz` 文件 ，保存了原始的显微镜图像和 图像 QC 信息。
{% endhint %}

<figure><img src="../img/assets/SAW_counf_for_FFPE.png" alt=""><figcaption></figcaption></figure>

输出结果主要包括：

* 比对和注释后的 BAM 文件；
* 处理后的图像文件；
* 不同维度的基因表达矩阵；
* 聚类​​和差异表达分析结果；
* 可视化文件 `visualization.tar.gz` ， 用于 **StereoMap**。

## Demo 数据

本教程页面使用了 Stereo-seq Chip T 捕获的小鼠肾脏组织样本。

C02533C1 数据基本信息如下：

* 芯片尺寸：1cm \* 1cm (S1)&#x20;
* Bin1： 500 nm \* 500 nm
* 5μm 厚度的组织切片
* Motic 显微镜拍摄得到的 ssDNA 染色图像

在[数据集页面](http://116.6.21.110:8090/share/21bb9df9-e6c5-47c5-9aa8-29f2d23a6df4)下载芯片 mask 文件、测序 FASTQ 数据、TIFF 图像或图像 `tar.gz` 文件，以及 reference 文件。为了更好地归纳和整理数据，建议为不同类型的文件创建对应的文件夹。

```sh
$ cd /saw

# Create sub-folders of different datasets
$ mkdir -p datasets/fastqs datasets/mask datasets/image datasets/reference
```

## 参数命令

在工作目录下，运行设置 `SAW count` 参数命令：

```sh
saw count \    
    --id=<task_id> \
    --sn=<SN> \
    --omics=transcriptomics \
    --kit-version="Stereo-seq N FFPE V1.0" \
    --sequencing-type="PE75_25+59" \
    --chip-mask=/path/to/chip/mask \
    --organism=<organism> \
    --tissue=<tissue> \
    --fastqs=/path/to/fastq/folders \
    --reference=/saw/datasets/reference \
    --image-tar=/path/to/image/tar

```

{% hint style="info" %}
对于 FFPE 样本，`SAW count` 支持进行微生物比对分析，需要设置 `--microorganism-detect` 和 `--ref-libraries` 参数。

* `--ref-libraries` 配置CSV 文件整合了STAR、Bowtie2 和 Kraken2 的索引文件信息。有关构建 reference 的详细内容请参阅 [SAW makeRef 教程](preparation-of-reference.md)。&#x20;
* `--ref-libraries` 与 `--reference` 两个参数不兼容。
{% endhint %}

你需要评估你的组织样本是否适合进行微生物比对分析，这可能与前序步骤中的生化实验部分有关。&#x20;

命令行中参数的简要说明：

<table><thead><tr><th width="208">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--id</code></td><td>(Optional, default to None) A unique task id ([a-zA-Z0-9_-]+) which will be displayed as the output folder name and the title of HTML report. If the parameter is absent, <code>--sn</code> will play the same role.</td></tr><tr><td><code>--sn &#x3C;SN></code></td><td>(Required, default to None) SN (serial number) of the Stereo-seq chip.</td></tr><tr><td><code>--omics &#x3C;OMICS></code></td><td>(Required, default to "transcriptomics") Omics information.</td></tr><tr><td><code>--kit-version &#x3C;TEXT></code></td><td>(Required, default to None) The version of the product kit. More in <a href="../analysis/pipelines/count/">count pipeline introduction</a>.</td></tr><tr><td><code>--sequencing-type &#x3C;TEXT></code></td><td>(Required, default to None) Sequencing type of FASTQs which is recorded in the sequencing report.</td></tr><tr><td><code>--chip-mask &#x3C;MASK></code></td><td>(Required, default to None) Stereo-seq chip mask file.</td></tr><tr><td><code>--organism &#x3C;TEXT></code></td><td>(Optional, default to None) Organism type of sample, usually referring to species.</td></tr><tr><td><code>--tissue &#x3C;TEXT></code></td><td>(Optional, default to None) Physiological tissue of sample.</td></tr><tr><td><code>--reference &#x3C;PATH></code></td><td>(Optional, default to None) Path to the reference folder, containing SAW-compatible index files and GTF/GFF, built by <a href="preparation-of-reference.md#for-star"><code>SAW makeRef</code></a>.</td></tr><tr><td><code>--ref-libraries &#x3C;CSV></code></td><td>(Optional, default to None) Path to a <a href="preparation-of-reference.md#reference-libraries"><code>ref_libraries.csv</code></a> which declares reference indexes, built by <a href="preparation-of-reference.md"><code>SAW makeRef</code></a>. Not compatible with <code>--reference</code>.</td></tr><tr><td><code>--fastqs &#x3C;PATH></code></td><td>(Required, default to None) Path(s) to folder(s), containing all needed FASTQs. If FASTQs are stored in multiple directories, use it as: <code>--fastqs=/path/to/directory1,/path/to/directory2,...</code>.  Notice that all FASTQ files under these directories will be loaded for analysis. </td></tr><tr><td><code>--image &#x3C;TIFF></code></td><td>(Optional, default to None) TIFF image for QC (quality control), combined with expression matrix for analysis.<br><strong>Name rule for input TIFF :</strong><br>a. <code>&#x3C;SN>_&#x3C;stain_type>.tif</code><br>b. <code>&#x3C;SN>_&#x3C;stain_type>.tiff</code><br>c. <code>&#x3C;SN>_&#x3C;stain_type>.TIF</code><br>d. <code>&#x3C;SN>_&#x3C;stain_type>.TIFF</code><br><strong>&#x3C;stainType> includes:</strong><br>a. ssDNA<br>b. DAPI<br>c. HE (referring to H&#x26;E)<br>d. &#x3C;_IF_name1>_IF, &#x3C;IF_name2>_IF, ...</td></tr><tr><td><code>--image-tar &#x3C;TAR></code></td><td>(Optional, default to None) The compressed image <code>.tar.gz</code> file from StereoMap has been through prepositive QC (quality control).</td></tr><tr><td><code>--microorganism-detect</code></td><td>(Optional, default to None) Whether to perform analysis related to microorganisms. Notice that the detection only works for FFPE assay currently.</td></tr></tbody></table>

## 运行 SAW count

在工作目录下，运行设置 `SAW count` 分析任务：

```sh
cd /saw/runs

saw count \
    --id=Demo_Mouse_Brain \
    --sn=C04144D5 \
    --omics=transcriptomics \
    --kit-version="Stereo-seq N FFPE V1.0" \
    --sequencing-type="PE75_25+59" \
    --chip-mask=/saw/datasets/chip_mask/C04144D5.barcodeToPos.h5 \
    --organism=mouse \
    --tissue=brain \
    --fastqs=/saw/datasets/fastqs \
    --reference=/saw/datasets/reference/mouse_transcriptome \
    --image-tar=/saw/datasets/image/C04144D5_SC_20240620_153.tar.gz

```

{% hint style="info" %}
如果您输入图像为 TIFF 格式，文件名的前缀应为：

**\<SN>\_\<stain\_type>\_\*.tif**

例如：

* C04144D5\_ssDNA.tif
* SS200000135TL\_D1\_DAPI.tif
* C02533C1\_HE.tif （HE 指 H\&E 染色）
{% endhint %}

## 探索输出目录

分析任务运行结束后，在工作目录下会生成一个名为 `Demo_Mouse_Brain` 的输出文件夹，它的命名取决于 `--id` 参数，当`--id`参数没有启用时取决于 `--sn` 参数的信息。

`SAW count` 分析任务通常在工作目录下开启，在该目录下，将找到一个名为 `--id` 或 `--sn`（当`--id`参数没有启用时）的文件夹。输出结果依据数据类型被分类，主要文件被保存在 `/outs`下。

下面列出了 `SAW count` 的输出文件目录结构和内容：

```
Demo_Mouse_Brain
├── pipeline-logs
├── STEREO_ANALYSIS_WORKFLOW_PROCESSING
└── outs
    ├── analysis
    ├── bam
    ├── feature_expression
    ├── image
    ├── <SN>.report.tar.gz
    └── visualization.tar.gz
```

<figure><img src="../img/assets/Analysis_outputs.png" alt=""><figcaption></figcaption></figure>

进一步探究流程输出结果 ：

* 跳转至[HTML报告](../analysis/outputs/html-report.md)解读；
* 熟悉 [`visualization.tar.gz`](../analysis/outputs/count-outputs.md#visualization.tar.gz) 可视化文件；
* 了解[输出结果](../analysis/outputs/)中的各种文件类型。
