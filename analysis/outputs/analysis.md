# Analysis

## 聚类分析

`SAW count`, `realign` 和 `reanalyze` 分析流程以 AnnData H5AD 格式输出空间聚类结果，其中了数据记录预处理、降维、聚类和差异表达分析的信息结果。

{% hint style="info" %}
H5AD 中的聚类结果和 UMAP 降维信息可以在 **StereoMap** 中实现可视化。
{% endhint %}

这里详细展开了一个H5AD文件中的记录信息：

```sh
$ h5dump -n <task id>/outs/analysis/<SN>.bin200_1.0.h5ad ## you can also check <SN>.cellbin_1.0.h5ad
HDF5 "<task id>/outs/analysis/<SN>.bin200_1.0.h5ad" {
FILE_CONTENTS {
 group      /
 dataset    /X
 group      /layers
 group      /obs
 dataset    /obs/_index
 group      /obs/leiden
 dataset    /obs/leiden/categories
 dataset    /obs/leiden/codes
 dataset    /obs/n_genes_by_counts
 group      /obs/orig.ident
 dataset    /obs/orig.ident/categories
 dataset    /obs/orig.ident/codes
 dataset    /obs/pct_counts_mt
 dataset    /obs/total_counts
 dataset    /obs/x
 dataset    /obs/y
 group      /obsm
 dataset    /obsm/X_pca
 dataset    /obsm/X_umap
 dataset    /obsm/spatial
 group      /obsp
 group      /obsp/connectivities
 dataset    /obsp/connectivities/data
 dataset    /obsp/connectivities/indices
 dataset    /obsp/connectivities/indptr
 group      /obsp/distances
 dataset    /obsp/distances/data
 dataset    /obsp/distances/indices
 dataset    /obsp/distances/indptr
 group      /raw
 group      /raw/X
 dataset    /raw/X/data
 dataset    /raw/X/indices
 dataset    /raw/X/indptr
 group      /raw/var
 dataset    /raw/var/_index
 dataset    /raw/var/mean_umi
 dataset    /raw/var/n_cells
 dataset    /raw/var/n_counts
 group      /raw/var/real_gene_name
 dataset    /raw/var/real_gene_name/categories
 dataset    /raw/var/real_gene_name/codes
 group      /raw/varm
 group      /uns
 dataset    /uns/bin_size
 dataset    /uns/bin_type
 group      /uns/gene_exp_leiden
 dataset    /uns/gene_exp_leiden/1
...
 dataset    /uns/gene_exp_leiden/_index
 group      /uns/hvg
 dataset    /uns/hvg/method
 group      /uns/hvg/params
 dataset    /uns/hvg/source
 dataset    /uns/leiden_resolution
 group      /uns/neighbors
 dataset    /uns/neighbors/connectivities_key
 dataset    /uns/neighbors/distance_key
 group      /uns/rank_genes_groups
 dataset    /uns/rank_genes_groups/logfoldchanges
 group      /uns/rank_genes_groups/mean_count
 dataset    /uns/rank_genes_groups/mean_count/1
...
 dataset    /uns/rank_genes_groups/mean_count/_index
 dataset    /uns/rank_genes_groups/names
 group      /uns/rank_genes_groups/params
 dataset    /uns/rank_genes_groups/params/corr_method
 dataset    /uns/rank_genes_groups/params/groupby
 dataset    /uns/rank_genes_groups/params/method
 dataset    /uns/rank_genes_groups/params/reference
 dataset    /uns/rank_genes_groups/params/use_raw
 group      /uns/rank_genes_groups/pts
 dataset    /uns/rank_genes_groups/pts/1
...
 dataset    /uns/rank_genes_groups/pts/_index
 group      /uns/rank_genes_groups/pts_rest
 dataset    /uns/rank_genes_groups/pts_rest/1
...
 dataset    /uns/rank_genes_groups/pts_rest/_index
 dataset    /uns/rank_genes_groups/pvals
 dataset    /uns/rank_genes_groups/pvals_adj
 dataset    /uns/rank_genes_groups/scores
 dataset    /uns/resolution
 group      /uns/sn
 dataset    /uns/sn/_index
 dataset    /uns/sn/batch
 dataset    /uns/sn/sn
 group      /var
 dataset    /var/_index
 dataset    /var/dispersions
 dataset    /var/dispersions_norm
 dataset    /var/highly_variable
 dataset    /var/mean_umi
 dataset    /var/means
 dataset    /var/n_cells
 dataset    /var/n_counts
 group      /var/real_gene_name
 dataset    /var/real_gene_name/categories
 dataset    /var/real_gene_name/codes
 group      /varm
 group      /varp
 }
}

```

## 差异表达分析

`SAW count`, `realign` 和 `reanalyze` 会以 CSV 格式输出差异表达分析结果。

{% hint style="info" %}
差异表达分析的 CSV 结果文件有两种，分别为 `find_marker_genes.csv` 和 `<bin_size>_marker_features.csv`。

* `find_marker_genes.csv` 是差异表达分析的原始输出结果
* `<bin_size>_marker_features.csv` 中的数据信息经过整理，格式经过调整，更加简洁明了。
{% endhint %}

对于每个类群的特征信息，主要计算以下指标：：

* 平均 MID Count
* 表达占比的Log2变化值
* 校正后的 p-value
* 基因在类群内的表达占比

{% code title="<bin_size>_marker_features.csv" %}
```csv
Feature ID,Feature Name,Cluster 1 Mean MID Count,Cluster 1 Log2 fold change,Cluster 1 Adjusted p-value,Cluster 1 % of expressed, ... ,Cluster 20 Mean MID Count,Cluster 20 Log2 fold change,Cluster 20 Adjusted p-value,Cluster 20 % of expressed
ENSMUSG00000016559,H3f3b,67.1754386,42.00155933,1.76E-41,1, ... ,0.076923077,-63.19518177,0,0.076923077
```
{% endcode %}

{% hint style="info" %}
`<bin_size>_marker_features.csv` 中记录的差异表达分析结果可在 **StereoMap** 中查看，或直接使用 **Excel** 打开。
{% endhint %}
