# 软件介绍

## 什么是SAW软件?

STOmics 转录组技术由 STOmics Tech 开发，集成了专业设备和试剂盒，可实现高通量空间转录组测序，该技术可在组织和细胞维度上实现超高时空分辨率。Stereo-seq 芯片的优势在于可以捕获组织和细胞维度上的特征表达信息，此功能助力解析生物体中的时间变化和分子调控网络，研究转录变化的动态过程。

<figure><img src="../img/assets/image.png" alt=""><figcaption><p>Stereo-seq workflow</p></figcaption></figure>

SAW 是专门为时空转录组测序数据而设计的生信分析流程软件包，通过复原组织样本中每个捕获转录本 (Molecular ID，MID) 的空间位置 (Coordinate ID，CID) 和其对应的表达水平，来实现空间维度的特征表达信息提取。从海量数据集中提取高精度和高密度生物学信息。&#x20;

现在，SAW 工具包支持 FFPE 和 FF 组织样本的分析，可以对遗传发育、疾病病理和临床转化等领域的课题项目进行更多探索性的研究。

## 分析流程

SAW 提供以下分析流程用于处理 Stereo-seq 数据：&#x20;

* [**SAW count**](../analysis/pipelines/#he-xin-fen-xi-liu-cheng) 是 SAW 的核心分析流程，可以兼容大多数 Stereo-seq FF 和 Stereo-seq FFPE 数据。输入数据包括芯片 mask 文件、测序 FASTQ、参考基因组和显微镜拍照图像。流程输出 Stereo-seq 芯片的空间表达矩阵和分析结果。
* [**SAW realign**](../analysis/pipelines/#fu-zhu-fen-xi-liu-cheng) 是专门用于处理手动图像数据 (`.tar.gz`) 的辅助分析流程，使用调整后的图像重启分析，主要适用于自动分析流程的输出结果不够完美，或者图像QC结果失败的数据。
* [**其他辅助分析流程**](../analysis/pipelines/#fu-zhu-fen-xi-liu-cheng) 主要应用于索引文件构建、下游分析和文件格式转换。

## **显微镜图像**

SAW 使用显微镜拍照图像作为组织形态学的参考，协助分析流程，实现特征表达矩阵的空间可视化。SAW 分析中提供的图像类型包括荧光和 H\&E 染色图像。详细说明请参阅[显微镜图像](../analysis/inputs/images.md)模块。

## **标准分析流程**

&#x20;大多数情况下，SAW count 分析流程会自动完成显微镜图像与特征表达矩阵之间的配准。如果图像和矩阵间的自动配准不成功，或是QC失败的图像数据，可以在 StereoMap 中对其图像进行手动处理。更多关于图像手动处理的介绍，请参阅 [SAW realign 使用教程](../shi-yong-jiao-cheng/shou-dong-tu-xiang-chu-li.md)。
