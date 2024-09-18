# Stereo-seq FFPE

This tutorial will show you how to run `SAW count` on the Stereo-seq chip derived from a formalin-fixed paraffin-embedded (FFPE) mouse brain.

## Prerequisites

To run `SAW count` pipeline smoothly, you should:

* Be acquainted with the Linux system.
* Be familiar with running command line tools.
* Ensure access to a system that meets the [minimum system requirements](../download-center.md#system-requirements).

{% hint style="info" %}
**Adequate storage** and **sufficient permissions** should be paid more attention to, before running pipelines.
{% endhint %}

## Overview of SAW count pipeline

Stereo-seq sequencing data from FFPE tissues is analyzed with `SAW count`.

The pipeline typically commences with:

* a chip mask file (recording CIDs on the Stereo-seq chip),
* FASTQ files (from Stereo-seq sequencing),
* a reference (chosen by the organism),
* one or more microscope images (TIFF or image `.tar.gz` from **StereoMap**).

{% hint style="info" %}
The compressed image `.tar.gz` file, from StereoMap, saves the original microscope images and the QC information.
{% endhint %}

<figure><img src="../img/assets/SAW_counf_for_FFPE.png" alt=""><figcaption></figcaption></figure>

Output results mainly include:

* BAMs of alignment and annotation,
* processed images,
* gene expression matrices at different dimensions,
* clustering and differential expression analysis,
* an integrated `visualization.tar.gz` for **StereoMap**.

## Demo data

Demo data of the mouse brain from Stereo-seq Chip T is provided in this tutorial.

Key features of demo - C04144D5:&#x20;

* Chip size: 1cm \* 1cm (S1)
* Bin1: 500 nm \* 500 nm
* Tissue section of 10µm thickness
* ssDNA image acquired using Motic

The commands below will be executed in the working directory used to install SAW.

[The dataset page](broken-reference) allows you to download the chip mask file, the raw sequencing files in FASTQ format, a TIFF image or an image `tar.gz`. For better organization, creating new folders for corresponding data is a wise choice.

### Download data

{% hint style="warning" %}
The [Ossutil tool](../download-center.md#ossutil-tool) is required for downloading datasets to your Linux clustering system.
{% endhint %}

Using the `ossutil` command, download:

```sh
$ cd /saw

# Create sub-folders of different datasets
$ mkdir -p datasets/fastqs datasets/mask datasets/image

# Download chip mask to the datasets folder
$ /saw/tools/ossutil-v1.7.16-linux-amd64/ossutil64 -P datasets/mask https://link

# Download FASTQs to the datasets folder
$ /saw/tools/ossutil-v1.7.16-linux-amd64/ossutil64 -P datasets/fastqs https://link

# Download image to the datasets folder
$ /saw/tools/ossutil-v1.7.16-linux-amd64/ossutil64 -P datasets/image https://link
```

### Download reference

Also, download the reference, including the genome and built index files, using `wget`:

```sh
$ cd /saw

# Create a reference folder
$ mkdir datasets/reference 

# Download image to the datasets folder
$ /saw/tools/ossutil-v1.7.16-linux-amd64/ossutil64 -P datasets/image https://link
```

## Command lines

Set up `SAW count` analysis command in your working directory.

```sh
saw count \    
    --id=<task_id> \
    --sn=<SN> \
    --omics=transcriptomics \
    --kit-version="Stereo-seq N FFPE V1.0" \
    --sequencing-type="PE75_25+59" \
    --chip-mask=/path/to/chip/mask \
    --organism=<organism> \
    --tissue=<tissue> \
    --fastqs=/path/to/fastq/folders \
    --reference=/saw/datasets/reference \
    --image-tar=/path/to/image/tar

```

{% hint style="info" %}
Microorganism analysis is supported during `SAW count` on FFPE tissue samples. `--microorganism-detect` and `--ref-libraries` are both needed to detect microbes during analysis.

* `--ref-libraries` accepts a CSV file which includes the index files for several bioinformatical software, STAR, Bowtie2 and Kraken2. More details about building references in [the tutorial of `SAW makeRef`](preparation-of-reference.md).
* `--ref-libraries` is not compatible with `--reference`.
{% endhint %}

You need to estimate whether your tissue samples are suitable for detecting microorganisms, which may be relevant to the biochemical experiments conducted in the previous steps.

Brief descriptions of the mentioned parameters in command lines:

<table><thead><tr><th width="208">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--id</code></td><td>(Optional, default to None) A unique task id ([a-zA-Z0-9_-]+) which will be displayed as the output folder name and the title of HTML report. If the parameter is absent, <code>--sn</code> will play the same role.</td></tr><tr><td><code>--sn &#x3C;SN></code></td><td>(Required, default to None) SN (serial number) of the Stereo-seq chip.</td></tr><tr><td><code>--omics &#x3C;OMICS></code></td><td>(Required, default to "transcriptomics") Omics information.</td></tr><tr><td><code>--kit-version &#x3C;TEXT></code></td><td>(Required, default to None) The version of the product kit. More in <a href="../analysis/pipelines/count/">count pipeline introduction</a>.</td></tr><tr><td><code>--sequencing-type &#x3C;TEXT></code></td><td>(Required, default to None) Sequencing type of FASTQs which is recorded in the sequencing report.</td></tr><tr><td><code>--chip-mask &#x3C;MASK></code></td><td>(Required, default to None) Stereo-seq chip mask file.</td></tr><tr><td><code>--organism &#x3C;TEXT></code></td><td>(Optional, default to None) Organism type of sample, usually referring to species.</td></tr><tr><td><code>--tissue &#x3C;TEXT></code></td><td>(Optional, default to None) Physiological tissue of sample.</td></tr><tr><td><code>--reference &#x3C;PATH></code></td><td>(Optional, default to None) Path to the reference folder, containing SAW-compatible index files and GTF/GFF, built by <a href="preparation-of-reference.md#for-star"><code>SAW makeRef</code></a>.</td></tr><tr><td><code>--ref-libraries &#x3C;CSV></code></td><td>(Optional, default to None) Path to a <a href="preparation-of-reference.md#reference-libraries"><code>ref_libraries.csv</code></a> which declares reference indexes, built by <a href="preparation-of-reference.md"><code>SAW makeRef</code></a>. Not compatible with <code>--reference</code>.</td></tr><tr><td><code>--fastqs &#x3C;PATH></code></td><td>(Required, default to None) Path(s) to folder(s), containing all needed FASTQs. If FASTQs are stored in multiple directories, use it as: <code>--fastqs=/path/to/directory1,/path/to/directory2,...</code>.  Notice that all FASTQ files under these directories will be loaded for analysis. </td></tr><tr><td><code>--image &#x3C;TIFF></code></td><td>(Optional, default to None) TIFF image for QC (quality control), combined with expression matrix for analysis.<br><strong>Name rule for input TIFF :</strong><br>a. <code>&#x3C;SN>_&#x3C;stain_type>.tif</code><br>b. <code>&#x3C;SN>_&#x3C;stain_type>.tiff</code><br>c. <code>&#x3C;SN>_&#x3C;stain_type>.TIF</code><br>d. <code>&#x3C;SN>_&#x3C;stain_type>.TIFF</code><br><strong>&#x3C;stainType> includes:</strong><br>a. ssDNA<br>b. DAPI<br>c. HE (referring to H&#x26;E)<br>d. &#x3C;_IF_name1>_IF, &#x3C;IF_name2>_IF, ...</td></tr><tr><td><code>--image-tar &#x3C;TAR></code></td><td>(Optional, default to None) The compressed image <code>.tar.gz</code> file from StereoMap has been through prepositive QC (quality control).</td></tr><tr><td><code>--microorganism-detect</code></td><td>(Optional, default to None) Whether to perform analysis related to microorganisms. Notice that the detection only works for FFPE assay currently.</td></tr></tbody></table>

## Run SAW count

Set up `SAW count` analysis command in your working directory.

```sh
cd /saw/runs

saw count \
    --id=Demo_Mouse_Brain \
    --sn=C04144D5 \
    --omics=transcriptomics \
    --kit-version="Stereo-seq N FFPE V1.0" \
    --sequencing-type="PE75_25+59" \
    --chip-mask=/saw/datasets/chip_mask/C04144D5.barcodeToPos.h5 \
    --organism=mouse \
    --tissue=brain \
    --fastqs=/saw/datasets/fastqs \
    --reference=/saw/datasets/reference/mouse_transcriptome \
    --image-tar=/saw/datasets/image/C04144D5_SC_20240620_153.tar.gz

```

{% hint style="info" %}
If you input a or certain images in TIFF, the prefixes of the file names should be:

**\<SN>\_\<stainType>\_\*.tif**

e.g.:

* C04144D5\_ssDNA.tif
* SS200000135TL\_D1\_DAPI.tif
* C02533C1\_HE.tif (HE refers to H&E-stained)
{% endhint %}

## Explore the output structure

After pipeline analysis is completed, a new folder named `Demo_Mouse_Brain` (which is provided by `--id`, or by `--sn` in the absence of `--id`) will appear in your working directory.

All the metadata and outputs generated from `SAW count` are listed below:

```
Demo_Mouse_Brain
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

<figure><img src="../img/assets/Analysis_outputs.png" alt=""><figcaption></figcaption></figure>

If you want to dig deeper into the results,

* Jump to the [`report.html`](../analysis/outputs/html-report.md) inside `<SN>.report.tar.gz`.
* Explore the [`visualization.tar.gz`](../analysis/outputs/count-outputs.md#visualization.tar.gz) in **StereoMap**.
* Learn more about the individual files on the [Outputs](../analysis/outputs/) page.
