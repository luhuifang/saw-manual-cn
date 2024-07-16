# 数据再分析

本教程将将展示如何运行辅助分析流程 `SAW reanalyze`，进行聚类分析、差异表达分析和 lasso 区域的表达矩阵提取。

## &#x20;聚类分析

在生信下游分析中，聚类是一种关键且基本的算法处理，可将具有相似特征的空间表达点归为同组，该过程有助于揭示表达数据中的底层结构和模式。

在进行分析前，需要根据数据的物种和组织类型来选择合适的 [bin size](../getting-started/glossary.md) 例如，哺乳动物细胞的直径约为 10 µm，DNB 的物理间距为 500 nm，因此 bin20 会是一个合适的选择。

调用 [Leiden 算法](../algorithms/gene-expression-algorithms.md#clustering) 进行聚类时，`--Leiden-resolution` 参数的默认值为 1.0，它可以调控 Leiden 聚类时的分群颗粒度，值越大，分群簇越多。并且，可以开启 `--marker` 参数，基于 Leiden 算法的分群结果进行差异表达分析。&#x20;

如果使用 bin GEF 进行聚类，运行命令如下：

```sh
saw reanalyze \
    --gef=/path/to/input/GEF \
    --bin-size=20 \
    --Leiden-resolution=1.0 \
    --marker \
    --output=/path/to/output/clustering
```

基于 bin GEF 的聚类输出如下：

```sh
clustering
├── <SN>.bin20_1.0.h5ad  ##<SN>.<bin_size>_<resolution>.h5ad, containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── bin20_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

{% hint style="info" %}
在运行分析时开启 `--marker` ，将获得与差异表达分析相关的结果，即 `find_marker_genes.csv` 和 `<bin_size>_marker_features.csv`。

* `find_marker_genes.csv` 是原始差异分析结果文件。
* `<bin_size>_marker_features.csv` 是一个[经过格式调整CSV](../analysis/outputs/analysis.md#differential-expression-analysis)，记录了每个类群的平均 MID count、L2FC、校正后的 p-value 和基因在类群内的表达占比等。
{% endhint %}

如果使用 cellbin GEF 进行聚类，运行命令如下：

```sh
saw reanalyze \
    --cellbin-gef=/path/to/input/cellbin/GEF \
    --Leiden-resolution=1.0 \
    --marker \
    --output=/path/to/output/folder
```

基于 cellbin GEF 的聚类输出如下：

```sh
clustering_analysis
├── <SN>.cellbin.gef  ##a copy of input cellbin GEF but with new clustering information
├── <SN>.cellbin_1.0.h5ad  ##<SN>.cellbin_<resolution>.h5ad, containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── cellbin_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

## 矩阵套索

**StereoMap** 中的交互式工具可以 lasso （手动圈选）感兴趣区域，它需要 `SAW reanalyze` 分析流程来协助将 lasso GeoJSON 中区域信息转化为特征表达矩阵。

<figure><img src="../img/assets/image (45).png" alt="" width="563"><figcaption><p>Lasso in StereoMap</p></figcaption></figure>

如果使用 bin GEF 进行 lasso，运行分析如下：

```sh
saw reanalyze \
    --gef=/path/to/input/GEF \
    --lasso-json=/path/to/lasso/geojson \
    --bin-size=1,20,50 \
    --output=/path/to/output/folder
```

{% hint style="info" %}
`--bin-size` 参数可以接收一个列表，以便一次生成多个 bin size 的表达矩阵文件。&#x20;
{% endhint %}

基于 bin GEF 的 lasso 输出如下：

```sh
Lasso
├── <label1>
│       ├── SN.<label1>.label.gef  ##lasso GEF of bin1
│       └── segmentation
│              ├── SN.lasso.<bin_size_list[0]>.<label1>.gem.gz  ##GEM of lasso area of different bin sizes
│              ...
│              ├── SN.lasso.<bin_size_list[n]>.<label1>.gem.gz
│              └── SN.lasso.<label1>.mask.tif  ##mask image of lasso area
└── <label2>
       ├── ...
       └── ...
```

如果使用 cellbin GEF 进行 lasso，运行分析如下：

```sh
saw reanalyze \
    --cellbin-gef=/path/to/input/cellbin/GEF \
    --lasso-json=/path/to/lasso/GeoJSON \
    --output=/path/to/output/folder
```

基于 cellbin GEF 的 lasso 输出如下：

```sh
lasso
├── <label1>
│       └── SN.<label1>.label.cellbin.gef  ##cellbin GEF of lasso area
└── <label2>
        └── ...
```

## 差异表达分析

`SAW reanalyze` 可以使用来自 **StereoMap** 的 diffexp GeoJSON 文件，基于聚类类群选择和套索区域进行差异表达分析。

{% hint style="info" %}
选定的聚类类群和套索区域被记录在 diffexp GeoJSON 文件中。
{% endhint %}

运行分析如下：

```bash
saw reanalyze \
    --count-data=/path/to/previous/SAW/count/result/folder/id \
    --de-json=/path/to/StereoMap/diffexp/GeoJSON \
    --output=/path/to/output/folder
```

{% hint style="info" %}
`--count-data` 是相关联的`SAW count` 分析任务的输出目录，`SAW reanalyze` 将自动搜索差异表达分析所需的数据文件。相关信息记录在 `*.diffexp.geojson` 中。
{% endhint %}

差异表达分析输出如下：

```sh
Differential_expression
├── <SN>.<bin_size>_1.0.h5ad  ##H5ad containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── <bin_size>_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

或：

```sh
Differential_expression
├── <SN>.cellbin_1.0.h5ad  ##H5ad for cellbin containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── cellbin_marker_features.csv  ##formatted CSV for visualization in StereoMap
```
