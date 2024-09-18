# Secondary analysis

In this tutorial, you will learn how to run the complementary pipeline `SAW reanalyze` for clustering, differential expression analysis, and lasso.

## Clustering

In bioinformatic downstream analysis, clustering is a critical and fundamental method that creates groups of spatial expression points with similar characteristics. The process helps uncover the underlying structure and patterns within the expression data. Clustering plays a crucial role in bioinformatics research because of its versatility in finding gene expression patterns, investigating cell types, and studying disease subtypes.

Choose an appropriate [bin size](../getting-started/glossary.md#stomics-terminology) for your datasets. For example, the diameter of a mammalian cell is about 10 µm, based on the physical spacing of a pair of DNBs being 500 nm, so it can be roughly estimated that bin20 is a suitable starting point.&#x20;

[Leiden algorithm](../algorithms/gene-expression-algorithms.md#clustering) is called for clustering, `--Leiden-resolution` , default to 1.0, controls the coarseness of the clustering when performing Leiden. Higher values lead to more clusters.

Differential expression analysis can be performed through `--marker` based on the clusters categorized by Leiden algorithm.

You can perform clustering with a bin GEF and set up the command as below:

```sh
saw reanalyze \
    --gef=/path/to/input/GEF \
    --bin-size=20 \
    --Leiden-resolution=1.0 \
    --marker \
    --output=/path/to/output/clustering
```

Clustering outputs based on bin GEF are listed:

```sh
clustering
├── <SN>.bin20_1.0.h5ad  ##<SN>.<bin_size>_<resolution>.h5ad, containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── bin20_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

{% hint style="info" %}
If turn `--marker` on to the analysis, you will get results related to differential expression analysis, namely `find_marker_genes.csv` and `<bin_size>_marker_features.csv`.

* `find_marker_genes.csv` is the original output file.
* `<bin_size>_marker_features.csv`. is [a formatted CSV](../analysis/outputs/analysis.md#differential-expression) that records mean MID counts, L2FC, adjusted p-value, and expression ratio of marker features for each cluster.
{% endhint %}

Or begin with a cellbin GEF:

```sh
saw reanalyze \
    --cellbin-gef=/path/to/input/cellbin/GEF \
    --Leiden-resolution=1.0 \
    --marker \
    --output=/path/to/output/folder
```

Clustering outputs based on cellbin GEF are listed:

```sh
clustering_analysis
├── <SN>.cellbin.gef  ##a copy of input cellbin GEF but with new clustering information
├── <SN>.cellbin_1.0.h5ad  ##<SN>.cellbin_<resolution>.h5ad, containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── cellbin_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

## Lasso

The interactive tool in **StereoMap** can manually delineate closed regions of interest. It needs `SAW reanalyze` to extract feature expression matrices of regions, using the GeoJSON from **StereoMap**.

<figure><img src="../img/assets/image (68).png" alt="" width="563"><figcaption><p>Lasso in StereoMap</p></figcaption></figure>

Run the pipeline for lasso, and set up the command as below:

```sh
saw reanalyze \
    --gef=/path/to/input/GEF \
    --lasso-geojson=/path/to/lasso/geojson \
    --bin-size=1,20,50 \
    --output=/path/to/output/folder
```

{% hint style="info" %}
`--bin-size` parameter can accept a list of INTs to generate expression matrices with multiple bin sizes at once.
{% endhint %}

Lasso outputs based on bin GEF are listed:

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

Or begin with:

```sh
saw reanalyze \
    --cellbin-gef=/path/to/input/cellbin/GEF \
    --lasso-geojson=/path/to/lasso/GeoJSON \
    --output=/path/to/output/folder
```

Lasso outputs based on cellbin GEF are listed:

```sh
lasso
├── <label1>
│       └── SN.<label1>.label.cellbin.gef  ##cellbin GEF of lasso area
└── <label2>
        └── ...
```

## Differential expression analysis

`SAW reanalyze` can perform differential expression analysis based on both clustering and lasso areas, using the diffexp **GeoJSON** file from **StereoMap**.

{% hint style="info" %}
Selected clusters and lasso regions are recorded in the diffexp GeoJSON.
{% endhint %}

Perform the analysis simply:

```bash
saw reanalyze \
    --count-data=/path/to/previous/SAW/count/result/folder/id \
    --diffexp-geojson=/path/to/StereoMap/diffexp/GeoJSON \
    --output=/path/to/output/folder
```

{% hint style="info" %}
`--count-data` accepts an output directory of the last `SAW count`, `SAW reanalyze` will detect all files, needed for differential expression analysis. Related information is recorded in the `*.diffexp.geojson`.
{% endhint %}

Differential expression analysis outputs are listed:

```sh
Differential_expression
├── <SN>.<bin_size>_1.0.h5ad  ##H5ad containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── <bin_size>_marker_features.csv  ##formatted CSV for visualization in StereoMap
```

Or:

```sh
Differential_expression
├── <SN>.cellbin_1.0.h5ad  ##H5ad for cellbin containing analysis results
├── find_marker_genes.csv  ##original output CSV
└── cellbin_marker_features.csv  ##formatted CSV for visualization in StereoMap
```
