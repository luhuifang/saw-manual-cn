# 输入文件

在运行 SAW 分析流程之前，应提前准备好输入文件。启动分析的输入文件因生化实验操作、测序数据类型、选择的 SAW 分析流程等因素会有所不同。

## SAW count 输入文件

准备输入文件、分析流程和参数设置时，请考虑以下事项：

{% hint style="success" %}
使用哪个分析流程？
{% endhint %}

`SAW count` 是将测序 FASTQ（数据）转换为空间特征表达矩阵（信息）的核心分析流程。在启动标准分析之前，应当调用 `SAW makeRef` 辅助流程构建参考基因组的索引文件，用于 read 的比对和注释。

{% hint style="success" %}
什么是时空芯片？
{% endhint %}

Stereo-seq Chip T/N 芯片是时空转录组测序的载体，与 FASTQ 数据密切相关，时空芯片涉及的主要信息包括 SN（芯片序列号）和记录 CID 信息（Coordiante ID）的芯片 mask 文件。

{% hint style="success" %}
如何获取芯片 mask 文件？
{% endhint %}

时空芯片 mask 文件对于`SAW count` 分析流程的开启至关重要，可以从 [STOmics Cloud](https://cloud.stomics.tech/) 上的在线项目文件中获取。学习[相关下载教程](https://www.stomics.tech/helpcenter/usermanual/E.Project/D.Data.html#file-download%E2%80%94ossutil-tool-download)，可直接将芯片 mask 下载 Linux 服务器上。

{% hint style="success" %}
如何选择图像？
{% endhint %}

SAW 通常需要显微镜拍照图像来作为样本组织的解剖结构参考图，是否输入图像（支持`TIFF` 或 `.tar.gz`格式）取决于具体的分析需求。

{% hint style="success" %}
如何确认一些重要的参数信息？
{% endhint %}

`--kit-version` 与产品试剂盒的版本相关，可在生化实验操作手册中找到对应信息，通过该参数程序可以自动识别流程中的内置参数设置，例如，“Stereo-seq T FF V1.2”表示对 Stereo-seq Chip T 芯片上的 FF（新鲜冷冻）组织样本开展分析。&#x20;

`--sequencing-type` 时空测序生成的报告相关，例如，“PE100\_50+100” 表示双端测序长度为100bp的，read 1 循环50次，read 2 循环100次。

## SAW realign 输入文件

{% hint style="success" %}
是否已经运行过一次`SAW count`标准分析流程？
{% endhint %}

将`SAW count` 输出 `visualization.tar.gz` 可视化压缩文件下载至本地后，解压后输入到 **StereoMap** 进行可视化查看和手动图像处理。需要注意，此次`SAW count` 的输出结果将在后续手动处理中发挥重要作用。

{% hint style="success" %}
是否已经完成图像手动处理？
{% endhint %}

经过一系列手动调整后，**StereoMap** 的 Image Processing 模块会生成一个“重新调整”后的图像 `.tar.gz` 文件，将该文件传给 `SAW realign` 的 `--realigned-image-tar` 参数，重启分析流程。
