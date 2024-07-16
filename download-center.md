# 下载中心

{% hint style="success" %}
请根据下面的提示步骤，在计算环境中安装SAW软件：

* [检查系统配置要求](download-center.md#system-requirements)
* [下载SAW](download-center.md#software-download)
* [安装SAW](download-center.md#download-and-installation)
* [下载参考基因组](download-center.md#reference-download)（可选择）
{% endhint %}

## 系统配置要求

SAW分析软件包在Linux系统上被解压和安装，计算环境需满足下列基本要求：&#x20;

* 8-core Intel or AMD processor (>24 cores recommended)
* 128GB RAM (>256GB recommended)
* 1TB free disk space or higher
* 64-bit CentOS/RedHat 7.8 or Ubuntu 20.04

***

## 软件下载

### SAW 8.0.1 (7月8日, 2024)

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th><th data-type="files"></th></tr></thead><tbody><tr><td><a href="https://cdn-newfile.stomics.tech/saw-8.0.1.tar.gz"><strong>Download for Linux 64-bit (tar.gz)</strong></a></td><td></td><td></td></tr><tr><td>File size: 3.0 GB</td><td>md5sum: afd82ed454f5ab06c8f24ff2572f10b9</td><td></td></tr></tbody></table>

{% code title="With curl" %}
```bash
curl -o saw_8.0.1.tar.gz "https://cdn-newfile.stomics.tech/saw-8.0.1.tar.gz"sh
```
{% endcode %}

或：

{% code title="With wget" %}
```bash
wget -O saw_8.0.1.tar.gz "https://cdn-newfile.stomics.tech/saw-8.0.1.tar.gz"
```
{% endcode %}



> ## **SAW-8.0.0 软件亮点**
>
>
>
> * SAW本次更新以单体可执行程序`.tar.gz` 文件的形式发布，可以直接在系统上解压，无需额外配置计算环境。由于它已经集成并预编译所有内置软件所需的依赖项，因此可以在大多数Linux环境直接运行。
> * 整合并简化流程使命令编写和完成分析变得更加便捷。这些流程模块包括：
>   * `SAW count`：核心流程模块，用于根据计算基因表达读数和Stereo-seq芯片生成表达矩阵。
>   * `SAW makeRef`：根据参考基因组数据构建索引文件。
>   * `SAW checkGTF`：检查注释文件的格式。
>   * `SAW realign`：使用手动处理的文件重新启动分析。
>   * `SAW reanalyze`：重新执行下游分析。
>   * `SAW convert`：支持文件格式转换。
> * **SAW**支持从**FFPE**（formalin-fixed paraffin-embedded）样本中获取基因表达信息。在运行`SAW count`时，通过将`--kit-version`**设置为**`"Stereo-seq N FFPE Kit V1.0"`**来实现。对于FFPE分析，需要使用**SAW v8.0.0或更高版本。
> * 基于 FFPE 组织样本，可以在运行 `SAW count` 时通过使用`--microorganism-detect` 参数来开启微生物分析，需要准备必要的参考数据集。更多信息请参阅[参考基因组准备](shi-yong-jiao-cheng/preparation-of-reference.md)。
> * **SAW**还升级了读取比对和注释的生物信息学工作流程，以适应FFPE数据集。
>   * 在注释过程中，默认情况下会同时使用唯一比对 reads 和 多比对 reads 中的最优比对进行基因定量分析。如果分析人员只关注唯一比对 reads，可以使用`--uniquely-mapped-only`参数。
>   * 新的空间基因表达矩阵通过唯一基因ID进行标识，同时依然记录基因名称信息。
> * 在图像相关的分析部分，软件对图像处理性能进行了优化。同时，在运行`SAW count`时，支持以TIFF格式直接输入显微镜拼接大图图像。
> * **SAW** 分析中新增了基于 Leiden 聚类进行的差异表达分析，marker features 被记录在AnnData格式的 H5AD 和 CSV 文件中，并在HTML报告和StereoMap中展示。
> * HTML 报告中的图表是交互式的，新增微生物分析页面，增加了 marker features 结果表格。
> * 重新整理输出目录结构，使得结果文件更加清晰易查找，并将中间环节文件和日志放入指定的文件夹中。
> * 输出可视化压缩文件`visualization.tar.gz`，其中包含`.stereo`统领文件，用于记录 **SAW** 分析流程的基本信息和 **StereoMap** 所需的字段信息。

[版本说明 >](release-notes.md)

## 参考基因组下载

SAW 提供小鼠的参考基因组下载，请跳转到[数据集](http://116.6.21.110:8090/share/21bb9df9-e6c5-47c5-9aa8-29f2d23a6df4)部分，demo数据同样可以从中获取。

## 解压安装

SAW 此版本为单体可执行程序的`.tar.gz` 文件，可以直接在系统上解压，无需额外配置计算环境。由于它已经集成并预编译所有内置软件所需的依赖项，因此可以在大多数Linux环境直接运行。

注意，参考基因组和 demo 数据集需要单独下载。

* **Step 1 -** 下载 SAW 软件包并解压到合适的目录位置，文档示例假设 `/saw/package` 为运行目录。

```sh
$ cd /saw/package

[download the SAW package tar.gz from the Software download part]

$ tar -xzf saw-8.0.1.tar.gz
```

* **Step 2** - 下载参考基因组文件并解压到合适的目录位置。文档示例假设 `/saw/reference`  为运行目录。

```sh
$ cd /saw/reference

[download the reference data from the Reference download part]

$ tar -xzf reference-mm10.tar.gz
# tar -xzf reference-mm10-with-rRNA.tar.gz
```

