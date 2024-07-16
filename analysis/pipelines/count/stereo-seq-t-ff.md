# Stereo-seq T FF

## 时空试剂盒信息

SAW支持分析FF (fresh frozen) 样本的时空芯片测试数据，工作流程如下图所示：

<figure><img src="../../../img/assets/SAW_counf_for_FF.png" alt=""><figcaption></figcaption></figure>

`--kit-version` 是开启分析前需要确认的重要信息，可参考 STOmics 的 Stereo-seq 转录组试剂套装使用说明书。

<table><thead><tr><th width="254">Stereo-seq Solution</th><th align="center">Stereo-seq Kit</th><th align="center">--kit-version</th></tr></thead><tbody><tr><td>Stereo-seq Transcriptomics Solution</td><td align="center">V1.2.1</td><td align="center">"Stereo-seq T FF V1.2"</td></tr><tr><td>Stereo-seq Transcriptomics mIF Solution</td><td align="center">V1.2</td><td align="center">"Stereo-seq T FF V1.2"</td></tr><tr><td>Stereo-seq Transcriptomics H&#x26;E Solution</td><td align="center">V1.2.1</td><td align="center">"Stereo-seq T FF V1.2"</td></tr><tr><td>Stereo-seq Transcriptomics Mini Chip Solution</td><td align="center">V1.2</td><td align="center">"Stereo-seq T FF V1.2"</td></tr><tr><td>Stereo-seq Large Chip Designs</td><td align="center">V1.0</td><td align="center">"Stereo-seq T FF V1.2"</td></tr></tbody></table>

_\*T 代表 Chip T 芯片_

根据上面的关系对应表，确认运行 `SAW count` 分析所需的 `--kit-version` 参数信息。

## 输入文件

`SAW count` 分析流程需要输入以下文件：

* Stereo-seq Chip T 芯片 mask 文件 (`--mask`)
* 时空测序 FASTQ 数据 (`--fastqs`)

{% hint style="info" %}
`--sequencing-type`参数信息与FASTQ测序数据相关，例：“PE100\_50+100”，表示双端测序长度为 100 bp，read 1 进行50次循环扩增 ，read 2 进行100次循环扩增。相关信息可以从测序报告中获取。
{% endhint %}

* 显微镜图像支持`TIFF`或 **StereoMap** QC模块输出的图像`.tar.gz`文件
  * `--image`参数支持直接输入显微镜拼接大图`TIFF`
  * `--image-tar`参数支持输入 **StereoMap** QC模块输出的图像`.tar.gz`文件
* Reference 包含物种的参考基因组 (FASTA) 和注释文件 (GTF/GFF) (`--reference`)
  * 参考基因组的索引文件需要预先构建，可使用 [`SAW makeRef`](../../../shi-yong-jiao-cheng/preparation-of-reference.md)
  * 分析流程会自动对注释文件的格式进行检查，也可以单独调用 [`SAW checkGTF`](../../../shi-yong-jiao-cheng/preparation-of-reference.md#saw-checkgtf) 进行格式检查

## 运行 SAW count

根据 [SAW 参数命令](../saw-can-shu-ming-ling.md)说明，或直接在命令行中输入 `saw count --help`，获取可用参数信息。在运行分析流程之前，确认已从 [STOmics Cloud](https://cloud.stomics.tech/) 平台下载芯片 mask 文件。

输入数据准备完毕后，根据图像 QC 结果选择合适的操作路径。

### 标准分析流程

使用 Stereo-seq FF 样本的测序数据进行基因比对和注释，输出空间特征表达矩阵，基于显微镜拍照图像，标准流程调用自动配准、组织分割、细胞分割和细胞修正算法对图像进行处理，结合表达矩阵数据和图像结果进行分析，使用下面的代码命令行开启`SAW count`分析：

{% hint style="warning" %}
如果是QC失败的图像数据，`SAW count`将不会在标准分析过程中调用图像算法，仅基于表达矩阵数据进行组织区域的识别。
{% endhint %}

```sh
cd /saw/runs

saw count \
    --id=<task_id> \
    --sn=<SN> \
    --omics=transcriptomics \
    --kit-version="Stereo-seq T FF V1.2" \
    --sequencing-type="PE100_50+100" \
    --chip-mask=/path/to/chip/mask \
    --organism=<organism> \
    --tissue=<tissue> \
    --fastqs=/path/to/fastq/folders \
    --reference=/path/to/reference/folder \
    --image-tar=/path/to/image/tar

```

详细教程请参考 [Stereo-seq FF 分析](../../../shi-yong-jiao-cheng/stereo-seq-ff.md) 部分。

### 图像手动处理

运行一次`SAW count` 标准分析流程后，可以从结果文件中获取 `visualism.tar.gz` 文件，下载至本地解压后，可在 StereoMap 中进行可视化查看和手动图像操作。经过一系列手动处理后，新生成的图像 `.tar.gz` 被传回 `SAW realign`，重启分析流程。

{% hint style="info" %}
QC失败的图像数据需要在StereoMap中手动进行矩阵和图像之间的配准操作，之后`SAW realign`重启分析流程，可以基于手动配准后的结果调用图像相关的算法进行分析处理，在此过程中手动处理的其他结果（手动处理得到的组织分割和细胞分割）不会被覆盖。
{% endhint %}

```sh
cd /saw/runs

saw realign \
    --id=<task_id2> \
    --sn=<SN> \
    --count-data=/path/to/previous/SAW/count/task/folder \
    --realigned-image-tar=/path/to/realigned/image/tar

```

详细教程请参考 [手动图像处理](../../../shi-yong-jiao-cheng/shou-dong-tu-xiang-chu-li.md) 部分。

## 输出结果

下面列出了`SAW count` 的输出文件目录结构和内容：

```sh
Demo_Mouse_Kidney
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

<figure><img src="../../../img/assets/Analysis_outputs.png" alt=""><figcaption></figcaption></figure>

进一步探究流程输出结果 ：

* 跳转至[HTML报告](../../outputs/html-report.md)解读；
* 熟悉 [`visualization.tar.gz`](../../outputs/count-outputs.md#visualization.tar.gz) 可视化文件；
* 了解[输出结果](../../outputs/)中的各种文件类型。
