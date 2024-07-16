# HTML report

_<mark style="background-color:purple;">\*The interpretation of the HTML report is only available in EN.</mark>_

`SAW count` and `SAW realign` pipelines will output an interactive report `<SN>.report.tar.gz` that contains `report.html`. The contents of the HTML report file will vary depending on the pipeline and parameters used but generally follow a similar format across runs.

On this page, we demonstrate the report of a mouse brain FFPE tissue sample run with `SAW count` (v8.0).

## **Summary**

<figure><img src="../../img/assets/image (62).png" alt=""><figcaption><p>Expression heatmap and four key metrics</p></figcaption></figure>

<figure><img src="../../img/assets/image (63).png" alt=""><figcaption><p>Display of microscope image</p></figcaption></figure>

The spatial gene expression distribution plot, on the left, shows MID count at each bin200.

`Total Reads` is the amount of total sequencing reads of input FASTQs. `Mean MID per Bin200` and `Mean Gene per Bin200` represent the mean MID and gene type counts at each bin200. `Unique Reads` is the number of reads in the transcriptome that have been corrected by MAPQ and deduplicated.

### Key metrics

<figure><img src="../../img/assets/image (64).png" alt=""><figcaption><p>Details and sunburst plot of key metrics</p></figcaption></figure>

Key metrics of the data are listed:

<table><thead><tr><th width="227">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Total Reads</td><td>Total number of sequenced reads.</td></tr><tr><td>Valid CID Reads</td><td>Number of reads with CIDs that can be matched with the mask file</td></tr><tr><td>Invalid CID Reads</td><td>Number of reads with CIDs that cannot be matched with the mask file.</td></tr><tr><td>Clean Reads</td><td>Number of Valid CID Reads that have passed QC.</td></tr><tr><td>Non-Relevant Short Reads</td><td>Number of non-relevant short reads</td></tr><tr><td>Discarded MID Reads</td><td>Number of reads with MID that have been discarded since MID sequence quality does not satisfy with further analysis.</td></tr><tr><td>Uniquely Mapped Reads</td><td>Number of reads that mapped uniquely to the reference genome. If the pipeline uses uniquely mapped reads and the best match from multi-mapped reads for subsequent annotation, this item will include them both</td></tr><tr><td>Transcriptome</td><td>Number of reads that are aligned to transcripts of at least one gene</td></tr><tr><td>Unique Reads</td><td>Number of reads in Transcriptome that have been corrected by MAPQ and deduplicated</td></tr><tr><td>Sequencing Saturation</td><td>Number of reads in Transcriptome that have been corrected by MAPQ with duplicated MID</td></tr><tr><td>Unannotated Reads</td><td>Number of reads that cannot be aligned to the transcript of one gene</td></tr><tr><td>Multi-Mapped Reads</td><td>Number of reads that mapped more than one time on the genome. If the pipeline uses uniquely mapped reads and the best match from multi-mapped reads for subsequenty annotation, this item will exclude multi-mapped ones to be annotated</td></tr><tr><td>Unmapped Reads</td><td>Number of reads that cannot be mapped to the reference genome.</td></tr><tr><td>rRNA Reads</td><td>Number of reads that mapped to the rRNA regions.</td></tr></tbody></table>

### Annotation

Metrics of reads to be annotated by GTF/GFF files.

<table><thead><tr><th width="234">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Transcriptome</td><td>Number of reads that mapped to a unique gene in the transcriptome. These reads are considered for MID counting. (Transcriptome = Exonic + Intronic)</td></tr><tr><td>Exonic</td><td>Number of reads that mapped uniquely to an exonic region and on the same strand of the genome.</td></tr><tr><td>Intronic</td><td>Number of reads that mapped uniquely to an intronic region and on the same strand of the genome.</td></tr><tr><td>Intergenic</td><td>Number of reads that mapped uniquely to an intergenic region and on the same strand of the genome.</td></tr><tr><td>Antisense</td><td>Number of reads mapped to the transcriptome but on the opposite strand of their annotated gene.</td></tr></tbody></table>

### Information

This item displays the basic information of the input FASTQs,&#x20;

`Organism` is from the `--organism` parameter used in `SAW count`, usually referring to the species.

`Tissue` is from the `--tissue` parameter used in `SAW count`.

`Reference` means the reference genome used in `SAW count`, as the same as `Organism`.

`FASTQ` records FASTQ files in `SAW count`, including file prefixes of all input sequencing FASTQs.

### Tissue related

<figure><img src="../../img/assets/image (65).png" alt=""><figcaption><p>Display and metrics related to tissue-coverage region</p></figcaption></figure>

The tissue segmentation result based on a microscope image is shown on the left, of which the tissue region is covered in purple.

Metrics related to tissue coverage are listed:

<table><thead><tr><th width="244">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Tissue Area</td><td>Tissue area in nm²​.</td></tr><tr><td>DNB Under Tissue</td><td>Number of DNBs under tissue coverage region.</td></tr><tr><td>mRNA-Captured DNBs Under Tissue</td><td>Number of DNBs under tissue that have captured mRNA.</td></tr><tr><td>Genes Under Tissue</td><td>Number of detected gene under tissue coverage.</td></tr><tr><td>Number of MID Under Tissue Coverage</td><td>Number of MID under tissue coverage.</td></tr><tr><td>Fraction MID in Spots Under Tissue</td><td><p>Fraction of MID under tissue over total unique reads.</p><p> (MID Under Tissue / Unique Reads)</p></td></tr><tr><td>Reads Under Tissue</td><td>Number of reads with position prior to filtration under tissue coverage.</td></tr><tr><td>Fraction Reads in Spots Under Tissue</td><td>Fraction of mapped reads under tissue over total mapped reads. (Mapped Reads in Spots Under Tissue / Valid CID Reads)</td></tr></tbody></table>

### Sequencing saturation

<figure><img src="../../img/assets/image (66).png" alt=""><figcaption><p>Sequencing saturation curves</p></figcaption></figure>

The saturation analysis in the HTML report can assess the overall quality of the sequencing data. In order to improve calculation efficiency, small samples are randomly selected from successfully annotated reads in the bin200 dimension. Therefore, the results of multiple runs of the same data may vary slightly. The formulas may not be identical, but the general shape of the curve is consistent.

* **Figure 1**: Statistics of Unique Reads (reads with unique CID, geneName and MID) in the sampled samples, saturation value = 1-(Unique Reads)/(Total Annotated Reads), as the sampling volume increases, the fitting curve becomes near-flat, indicating that the data tends to be saturated. Whether to add additional tests depends on the overall project design and sample conditions. For example, it is recommended that additional tests be performed on precious samples. The threshold value of 0.8 in the report serves as a reminder for recommended guidance.
* Figure 2: As the number of random samples increases, the gene median in the bin200 dimension gradually increases.
* Figure 3: Curves fitted based on Unique Reads data from randomly sampled samples, with a fitting curve R² ≥ 0.9.

{% hint style="info" %}
The x-axis of the three graphs is the same, and the y-axis is divided into saturation value, gene median, and number of Unique Reads.
{% endhint %}

## **Square Bin**

This page contains results of statistics, plots, clustering, UMAP, and differential expression analysis, at bin dimension. Results come from the analysis based on `<SN>.tissue.gef` file.

### Statistics

<figure><img src="../../img/assets/image (67).png" alt=""><figcaption><p>Statistics of bins under tissue-coverage region</p></figcaption></figure>

The above table records the statistics from bin 1 to bin 200:

<table><thead><tr><th width="247">Item</th><th>Description</th></tr></thead><tbody><tr><td>Bin Size</td><td><p>The size of Bin which is the unit of aggregated DNBs in a squared region.</p><p>i.e. Bin 50 = 50 * 50 DNBs</p></td></tr><tr><td>Mean Reads (per bin)</td><td>Mean number of sequenced reads divided by the number of bins under tissue coverage.</td></tr><tr><td>Median Reads (per bin)</td><td>Median number of sequenced reads divided by the number of bins under tissue coverage (pick the middle value after sorting).</td></tr><tr><td>Mean Gene Type (per bin)</td><td>Mean number of unique gene types divided by the number of bins under tissue coverage.</td></tr><tr><td>Median Gene Type (per bin)</td><td>Median number of unique gene types divided by the number of bins under tissue coverage.</td></tr><tr><td>Mean MID (per bin)</td><td>Mean number of MIDs divided by the number of bins under tissue coverage.</td></tr><tr><td>Median MID (per bin)</td><td>Median number of MIDs divided by the number of bins under tissue coverage</td></tr></tbody></table>

### Plots

<figure><img src="../../img/assets/image (68).png" alt=""><figcaption><p>Distribution plots of MID and gene type</p></figcaption></figure>

In the upper left corner,there is a a scatter plot of MID count and gene types in each bin.

In the upper right corner, violin plots show the distribution of deduplicated MID count and gene types in each bin.

On the bottom, univariate distribution of MID count, gene types, and DNB numbers is shown with rug along the x-axis.

### **Clustering & UMAP**

<figure><img src="../../img/assets/image (69).png" alt=""><figcaption><p>Leiden clustering and UMAP projection</p></figcaption></figure>

Clustering is performed based on `SN.tissue.gef` using the Leiden algorithm. UMAP projections are performed based on `SN.tissue.gef` and colored by automated clustering. The same color is assigned to spots that are within a shorter distance and with similar gene expression profiles.

### Differential expression analysis

<figure><img src="../../img/assets/image (70).png" alt=""><figcaption><p>Marker feature table</p></figcaption></figure>

The goal of the differential expression analysis is to identify markers that are more highly expressed in a cluster than the rest of the sample. For each marker, a differential expression test was run between each cluster and the remaining sample. An estimate of the log2 ratio of expression in a cluster to that in other coordinates is Log2 fold-change (L2FC). A value of 1.0 denotes a 2-fold increase in expression within the relevant cluster. Based on a negative binomial test, the p-value indicates the expression difference's statistical significance. The Benjamini-Hochberg method has been used to correct the p-value for multiple testing. Additionally, the top N features by L2FC for each cluster were kept after features in this table were filtered by (Mean UMI counts > 1.0). Grayed-out features have an adjusted p-value >= 0.10 or an L2FC < 0. N (ranges from 1 to 50) is the number of top features displayed per cluster, which is set to limit the amount of table entries displayed to 10,000. N=%10,000/K^2 where K is the number of clusters. Click on a column to sort by that value, or search a gene of interest.

{% hint style="info" %}
When the values of L2FC in the marker feature table are blank, "infinity" and "-infinity", the analysis results are normal. These conditions are well explained below.
{% endhint %}

The calculation of L2FC is related to the expression number of cells of a certain gene in the case group and the control group. Since the calculation of L2FC uses the natural logarithm as the base, when the expression relationship has extremely high or low values, the three special values, none, "inf" and "-inf", will appear. The screenshot below uses inf and a constant to make a simple demonstration.

<figure><img src="../../img/assets/image (6).png" alt="" width="563"><figcaption><p>An example in Notebook using Python</p></figcaption></figure>

{% hint style="warning" %}
The p-values should be increasing as the list descends (with a maximum of 1), infinitely close to 0.&#x20;

If you find that the p-value is 0 in the result table, it may be because the calculated differential expression feature is extremely significant, leading to an extremely small p-value. This can exceed the limit of the data type (usually `float64`, depending on the basic computing package), resulting in a situation that cannot be expressed in scientific notation.
{% endhint %}

## **Cell Bin**

This page contains results of statistics, plots, clustering, UMAP, and differential expression analysis, at cellbin dimension. Cell border expanding is automatically performed during `SAW count` and `SAW realign`, which means the contents of "Cell Bin" tab are based on `SN.adjusted.cellbin.gef`.&#x20;

{% hint style="warning" %}
When it comes to `--adjusted-distance=0` in `SAW realign`, all contents of this tab are based on `SN.cellbin.gef`.&#x20;
{% endhint %}

### Statistics

<figure><img src="../../img/assets/image (71).png" alt=""><figcaption><p>Detailed statistics of cellbin</p></figcaption></figure>

The above table records the statistics of cellbin:

<table><thead><tr><th width="247">Item</th><th>Description</th></tr></thead><tbody><tr><td>Cell Count</td><td>Number of cells.</td></tr><tr><td>Mean Cell Area</td><td>Mean cell area, in pixes.</td></tr><tr><td>Median Cell Area</td><td>Median cell area, in pixes.</td></tr><tr><td>Mean DNB Count</td><td>Mean number of DNBs that have captured-mRNAs per cell.</td></tr><tr><td>Median DNB Count</td><td>Median number of DNBs that have captured-mRNAs per cell.</td></tr><tr><td>Mean Gene Type</td><td>Mean gene types per cell.</td></tr><tr><td>Median Gene Type</td><td>Median gene types per cell.</td></tr><tr><td>Mean MID</td><td>Mean MID count per cell.</td></tr><tr><td>Median MID</td><td>Median MID count per cell.</td></tr></tbody></table>

### Plots

<figure><img src="../../img/assets/image (72).png" alt=""><figcaption><p>Distribution plots of MID and gene type</p></figcaption></figure>

In the upper left corner, there is a a scatter plot of MID count and gene types in the cellbin.

In the upper right corner, violin plots show the distribution of deduplicated MID count and gene types in the cellbin.

On the bottom, univariate distribution of MID count, gene types, and DNB numbers is shown with rug along the x-axis.

### **Clustering & UMAP**

<figure><img src="../../img/assets/image (73).png" alt=""><figcaption><p>Leiden clustering and UMAP projection</p></figcaption></figure>

Clustering is performed based on `SN.adjusted.cellbin.gef` or `SN.cellbin.gef`, using the Leiden algorithm. UMAP projections are performed based on `SN.adjusted.cellbin.gef` or `SN.cellbin.gef`, and colored by automated clustering. The same color is assigned to spots that are within a shorter distance and with similar gene expression profiles.

### Differential expression analysis

<figure><img src="../../img/assets/image (75).png" alt=""><figcaption><p>Marker feature table</p></figcaption></figure>

The goal of the differential expression analysis is to identify markers that are more highly expressed in a cluster than the rest of the sample. For each marker, a differential expression test was run between each cluster and the remaining sample. An estimate of the log2 ratio of expression in a cluster to that in other coordinates is Log2 fold-change (L2FC). A value of 1.0 denotes a 2-fold increase in expression within the relevant cluster. Based on a negative binomial test, the p-value indicates the expression difference's statistical significance. The Benjamini-Hochberg method has been used to correct the p-value for multiple testing. Additionally, the top N features by L2FC for each cluster were kept after features in this table were filtered by (Mean UMI counts > 1.0). Grayed-out features have an adjusted p-value >= 0.10 or an L2FC < 0. N (ranges from 1 to 50) is the number of top features displayed per cluster, which is set to limit the amount of table entries displayed to 10,000. N=%10,000/K^2 where K is the number of clusters. Click on a column to sort by that value, or search a gene of interest.

{% hint style="info" %}
Interpretation for exceptional cases related to differential expression analysis can be found under [Square Bin](html-report.md#differential-expression-analysis) part.
{% endhint %}

## **Image**

### Image information

Basic information about the microscopic staining image, usually involving microscope settings.

### QC

<table><thead><tr><th width="232">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Image QC version</td><td>The version of image QC module.</td></tr><tr><td>QC Pass</td><td>Whether the image(s) passed image QC quality check.</td></tr><tr><td>Trackline Score</td><td>Reference score for trackline detection.</td></tr><tr><td>Clarity Score</td><td>Reference score for image clarity.</td></tr><tr><td>Good FOV Count</td><td>Number of FOVs that have at least one track dot detected.</td></tr><tr><td>Total FOV Count</td><td>Total number of FOVs.</td></tr><tr><td>Stitching Score</td><td>Reference score for stitching.</td></tr><tr><td>Tissue Segmentation Score</td><td>Reference score for tissue segmentation.</td></tr><tr><td>Registration Score</td><td>Reference score for auto-aligning image with gene expression matrix.</td></tr></tbody></table>

### Stitching

<table><thead><tr><th width="251">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Template Source Row No.</td><td>The row number of the template FOV used for predicting the entire template.</td></tr><tr><td>Template Source Column No.</td><td>The column number of the template FOV used for predicting the entire template.</td></tr><tr><td>Global Height</td><td>Height of the stitched image.</td></tr><tr><td>Global Width</td><td>Width of the stitched image.</td></tr></tbody></table>

### Registration

<table><thead><tr><th width="256">Metric</th><th>Description</th></tr></thead><tbody><tr><td>ScaleX</td><td>The lateral scaling between image and template.</td></tr><tr><td>ScaleY</td><td>The longitudinal scaling between image and template.</td></tr><tr><td>Rotation</td><td>The rotation angle of the image relative to the template.</td></tr><tr><td>Flip</td><td>Whether the image is flipped horizontally.</td></tr><tr><td>Image X Offset</td><td>Offset between image and matrix in x direction.</td></tr><tr><td>Image Y Offset</td><td>Offset between image and matrix in y direction</td></tr><tr><td>Counter Clockwise Rotation</td><td>Counter clockwise rotation angle.</td></tr><tr><td>Manual ScaleX</td><td>The lateral scaling based on image center (manual-registration).</td></tr><tr><td>Manual ScaleY</td><td>The longitudinal scaling based on image center (manual-registration).</td></tr><tr><td>Manual Rotation</td><td>The rotation angle based on image center (manual-registration).</td></tr><tr><td>Matrix X Start</td><td>Gene expression matrix offset in x direction by DNB numbers.</td></tr><tr><td>Matrix Y Start</td><td>Gene expression matrix offset in y direction by DNB numbers.</td></tr><tr><td>Matrix Height</td><td>Gene expression matrix height.</td></tr><tr><td>Matrix Width</td><td>Gene expression matrix width.</td></tr></tbody></table>

## **Microorganism**

{% hint style="warning" %}
Here is an another FFPE tissue sample of mouse lung which is especially for microorganism analysis.
{% endhint %}

<figure><img src="../../img/assets/image (76).png" alt=""><figcaption><p>Bin200 microorganism heatmap under tissue region and four key metrics</p></figcaption></figure>

The distribution plot of microorganism spatial expression, on the left, shows MID count at each bin200.

### Denoising

<table><thead><tr><th width="244">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Total Reads</td><td>Total number of input reads.</td></tr><tr><td>Non-Host Source Reads</td><td>Number of reads that can not be aligned to the host genome.</td></tr><tr><td>Host Source Reads</td><td>Number of reads that can be aligned to the host genome during denoising.</td></tr></tbody></table>

### Taxonomic Classification

<figure><img src="../../img/assets/image (77).png" alt=""><figcaption><p>Mapping result of Bowtie2 and Kraken2</p></figcaption></figure>

<table><thead><tr><th width="264">Metric</th><th>Description</th></tr></thead><tbody><tr><td>Non-Host Source Reads</td><td>Number of reads that can not be aligned to the host genome.</td></tr><tr><td>Bacteria, Fungi and Viruses MIDs</td><td>Number of unique mRNA molecular assigned to bacteria, fungi or viruses.</td></tr><tr><td>Bacteria, Fungi and Viruses Duplication</td><td>Number of assigned reads that have been corrected due to duplicated MID.</td></tr><tr><td>Other Microbes or Host-Suspicious</td><td>Number of reads assigned to other microbes (exclude bacteria, fungi and viruses) or host.</td></tr><tr><td>Unclassified Reads</td><td>Number of unclassified reads.</td></tr></tbody></table>

### Microbes Proportion (Phylum)

<figure><img src="../../img/assets/image (79).png" alt=""><figcaption><p>Microbes proportion at phylum level</p></figcaption></figure>

The main proportion of microbes at the phylum level.

_\*the same for other classifications_

## **Alerts**

Thresholds are set for several important statistical indicators. If the analysis results are abnormal, an alert message will be displayed at the top of the HTML report.

{% hint style="warning" %}
Here is an abnormal exmple data just for display.
{% endhint %}

<figure><img src="../../img/assets/image (80).png" alt=""><figcaption><p>Alert information</p></figcaption></figure>
