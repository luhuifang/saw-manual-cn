# 分析流程

SAW 软件中的分析流程是对子程序模块的整合，每个程序模块都能够独立地特定的任务，以此满足不同用户场景的分析需求。

## 核心分析流程

[**SAW count**](count/) 是分析软件包的核心部分，支持处理绝大部分的 Stereo-seq FF 和 Stereo-seq FFPE 的数据。输入文集包括芯片 mask 文件、测序 FASTQ 、参考基因组和显微镜图像，输出空间特征表达矩阵和下游分析结果。

## 辅助分析流程

辅助分析流程包含：

* [`SAW makeRef`](../../shi-yong-jiao-cheng/preparation-of-reference.md#saw-makeref): 构建参考基因组的索引文件，需要 GTF/GFF 注释文件和 FASTA 基因组文件，以及包含特定、rRNA 信息的 FASTA 文件；
* [`SAW chechGTF`](../../shi-yong-jiao-cheng/preparation-of-reference.md#saw-checkgtf): 检查 GTF/GFF 注释文件是否为标准格式，在 `SAW count` 流程中会被自动调用。此外，可以从 GTF/GFF 中提取特定的注释信息；
* [`SAW realign`](../../shi-yong-jiao-cheng/shou-dong-tu-xiang-chu-li.md): 接回 **StereoMap** 手动处理后生成的图像 `.tar.gz` 文件，重启分析流程；
* [`SAW reanalyze`](../../shi-yong-jiao-cheng/secondary-analysis.md): 进行数据再分析，包含聚类分析、矩阵套索和差异表达分析；
* [`SAW convert`](../../shi-yong-jiao-cheng/shu-ju-ge-shi-zhuan-huan.md): 提供数据格式转换工具。

of which the purpose is to support the main pipeline `SAW count` and ensure smooth, convenient processing of the entire analysis.

辅助分析流程主要是为了支持 SAW 软件的正常运行，尽可能满足用户分析的使用场景，确保整个分析流程的顺利开展。
