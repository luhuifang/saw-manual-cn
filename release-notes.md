# 版本说明

## SAW发版记录

### 8.0.1 （7月8日, 2024）

**问题修复：**

* 修复软件部分已知BUG和问题。

### 8.0.0 （6月29日, 2024）

**新形态：**

SAW本次更新以单体可执行程序`.tar.gz` 文件的形式发布，可以直接在系统上解压，无需额外配置计算环境。由于它已经集成并预编译所有内置软件所需的依赖项，因此可以在大多数Linux环境直接运行。

**新功能：**

* 整合并简化流程使命令编写和完成分析变得更加便捷。这些流程模块包括：
  * `SAW count`：核心流程模块，用于根据计算基因表达读数和 Stereo-seq 芯片生成表达矩阵。
  * `SAW makeRef`：根据参考基因组数据构建索引文件。
  * `SAW checkGTF`：检查注释文件的格式。
  * `SAW realign`：使用手动处理的文件重新启动分析。
  * `SAW reanalyze`：重新执行下游分析。
  * `SAW convert`：支持文件格式转换。
* **SAW** 支持从 **FFPE**（formalin-fixed paraffin-embedded）样本中获取基因表达信息。在运行 `SAW count` 时，通过将 `--kit-version` **设置为** `"Stereo-seq N FFPE Kit V1.0"` **来实现。对于 FFPE 分析，需要使用** SAW v8.0.0 或更高版本。
* 基于 FFPE 组织样本，可以在运行 `SAW count` 时通过使用 `--microorganism-detect` 参数来开启微生物分析，需要准备必要的参考数据集。更多信息请参阅[参考基因组准备](shi-yong-jiao-cheng/preparation-of-reference.md)。
* **SAW** 还升级了读取比对和注释的生物信息学工作流程，以适应 FFPE 数据集。
  * 在注释过程中，默认情况下会同时使用唯一比对 reads 和 多比对 reads 中的最优比对进行基因定量分析。如果分析人员只关注唯一比对 reads，可以使用 `--uniquely-mapped-only` 参数。
  * 新的空间基因表达矩阵通过唯一基因ID进行标识，同时依然记录基因名称信息。
* 在图像相关的分析部分，软件对图像处理性能进行了优化。同时，在运行 `SAW count` 时，支持以TIFF格式直接输入显微镜拼接大图图像。
* **SAW** 分析中新增了基于 Leiden 聚类进行的差异表达分析，marker features 被记录在AnnData格式的 H5AD 和 CSV 文件中，并在 HTML 报告和 StereoMap 中展示。
* HTML 报告中的图表是交互式的，新增微生物分析页面，增加了 marker features 结果表格。
* 重新整理输出目录结构，使得结果文件更加清晰易查找，并将中间环节文件和日志放入指定的文件夹中。
* 输出可视化压缩文件`visualization.tar.gz`，其中包含 `.stereo` 统领文件，用于记录 **SAW** 分析流程的基本信息和 **StereoMap** 所需的字段信息。

### 历史版本

历史版本信息可以从 [GitHub](https://github.com/STOmics/SAW) 获取。



***

**获取帮助**

**有任何关于SAW版本的问题或疑虑？**

**请联系当地销售或FAS/FBS。**
