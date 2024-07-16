---
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 比对索引构建

对于参考基因组和注释文件，SAW 软件提供了两个辅助分析流程，`SAW makeRef` 和 `SAW checkGTF`， 在运行 `SAW count` 分析任务之前，需要预先构建一个或多个参考基因组的索引文件。

## SAW makeRef

用于构建`SAW count`需要参考基因组索引文件的辅助分析流程。

{% hint style="info" %}
`SAW makeRef` 支持三种常用生信分析软件的索引构建，使用 `--mode`  参数来指定运行的模式。
{% endhint %}

### 转录组比对

#### STAR 索引文件

需要注释文件 （GTF/GFF） 和参考基因组 （FASTA） 来构建索引文件，用于测序 reads 的比对和注释。

{% code title="STAR" %}
```sh
cd /saw/datasets/reference

saw makeRef \
    --mode=STAR \
    --fasta=/path/to/FASTA1 \
    --gtf=/path/to/GTF/or/GFF \
    --genome=./transcriptome
```
{% endcode %}

{% hint style="warning" %}
`--genome` 参数需要传入一个不存在的文件夹路径，程序会自动创建。
{% endhint %}

运行命令行后，程序会自动生成 SAW 分析所需的目录结构，在 `--genome` 目录下生成索引文件和其他相关文件，包括:

* `./transcriptome/fasta`- 所有输入 FASTA 文件
* `./transcriptome/genes` - 注释文件
* `./transcriptome/STAR` 由 STOmics Tech 优化算法后的 STAR 索引文件

{% code title="" %}
```sh
/saw/datasets/reference/transcriptome
├── fasta
│     └── genome.fa
├── genes
│     └── genes.gtf
└── STAR
      ├── chrLength.txt
      ├── chrNameLength.txt
      ├── chrName.txt
      ├── chrStart.txt
      ├── exonGeTrInfo.tab
      ├── exonInfo.tab
      ├── FMindex
      ├── geneInfo.tab
      ├── Genome
      ├── genomeParameters.txt
      ├── SA
      ├── SAindex
      ├── SAindexAux
      ├── sjdbInfo.txt
      ├── sjdbList.fromGTF.out.tab
      ├── sjdbList.out.tab
      └── transcriptInfo.tab
 
```
{% endcode %}

#### 添加 rRNA 信息至参考基因组

如果计划在 SAW 分析中去除 rRNA 片段，使用 `--rRNA-FASTA` 参数来指定 rRNA 信息，将添加其到参考基因组 `--fasta` 中。

{% hint style="info" %}
信息处理的关键步骤：&#x20;

**Step 1：**鉴于传至 `--rRNA-FASTA` 参数的 rRNA 信息具有片段短且重复度高的特点，流程首先会对其进行去冗余；

**Step 2：**将 rRNA 信息添加到 `--fasta` 文件中，会在染色体信息列上增加“\_rRNA”后缀，例如：“1\_rRNA”，以区分 rRNA 区域和基本的参考基因组；&#x20;

**Step 3：**基于添加了去重 rRNA 信息的参考基因组，构建索引文件。
{% endhint %}

{% code title="STAR with rRNA" %}
```sh
cd /saw/datasets/reference

saw makeRef \
    --mode=STAR \
    --fasta=/path/to/FASTA \
    --gtf=/path/to/GTF/or/GFF \
    --rRNA-fasta=/path/to/rRNA/FASTA \
    --genome=./transcriptome_with_rRNA
```
{% endcode %}

输出结果和目录结构不变：

```bash
/saw/datasets/reference/transcriptome_with_rRNA         
├── fasta
│     └── genome.fa
├── genes
│     └── genes.gtf
└── STAR
      ├── chrLength.txt
      ├── chrNameLength.txt
      ├── chrName.txt
      ├── chrStart.txt
      ├── exonGeTrInfo.tab
      ├── exonInfo.tab
      ├── FMindex
      ├── geneInfo.tab
      ├── Genome
      ├── genomeParameters.txt
      ├── SA
      ├── SAindex
      ├── SAindexAux
      ├── sjdbInfo.txt
      ├── sjdbList.fromGTF.out.tab
      ├── sjdbList.out.tab
      └── transcriptInfo.tab
```

#### 快速使用

`SAW count` 分析对所使用的索引文件目录结构有要求，请按如下方式设置 `--reference`参数：

```bash
...
--reference=/saw/datasets/reference/transcriptome
or 
--reference=/saw/datasets/reference/transcriptome_with_rRNA
```

### 微生物分析

`SAW count` 支持对 Stereo-seq FFPE 的组织样本开展微生物分析，如果你的样本适用微生物比对分析，请在运行 `SAW count` 时同时设置 [`--microorganism-detect`](../analysis/pipelines/saw-can-shu-ming-ling.md#saw-count) 和 [`--ref-libraries`](preparation-of-reference.md#reference-libraries)

在启动分析之前，应分别构建所需的索引文件，[STAR](preparation-of-reference.md#transcriptome) 用于宿主的转录组比对，[Bowtie2](preparation-of-reference.md#for-bowtie2) 用于去除宿主的基因组， [Kraken2](preparation-of-reference.md#for-kraken2) 用于微生物的探索和分类。

#### Bowtie2 索引文件

在 `SAW count` 分析流程中，在进行**微生物比对分析**前，需要使用 Bowtie2 工具从 unmapped reads 中去除宿主的基因组信息。

{% hint style="info" %}
`SAW count`中 `--unmapped-reads` 参数的输出结果就是去宿主操作时的输入数据。
{% endhint %}

{% code title="Bowtie2" %}
```sh
#Scenario 1
cd /saw/datasets/reference

saw makeRef \
    --mode=Bowtie2 \
    --fasta=/path/to/host/FASTA1,/path/to/host/FASTA2,... \
    --basename=host \
    --genome=./Bowtie2
```
{% endcode %}

运行命令行后，输出目录包含这些文件：

```sh
/saw/dataset/reference/Bowtie2
├── human_genome_rRNA.fa  #Host FASTA
├── human_genome_rRNA.1.bt2  ##Bowtie2 index files, suffixed with .bt2
├── human_genome_rRNA.2.bt2
├── human_genome_rRNA.3.bt2
├── human_genome_rRNA.4.bt2
├── human_genome_rRNA.rev.1.bt2
└── human_genome_rRNA.rev.2.bt2
```

{% hint style="info" %}
`SAW makeRef` 提供了 `bowtie2-build` 构建索引时用到的基础、必要参数，用于 `SAW count` 的微生物分析。

有两种方法可以实现 Bowtie2 工具的全部功能：

* 使用原始 [Bowtie2](https://bowtie-bio.sourceforge.net/bowtie2/manual.shtml) 软件。
* 使用`--params-csv` 参数，调用 [Bowtie2](https://bowtie-bio.sourceforge.net/bowtie2/manual.shtml) 工具的原始参数命令。
{% endhint %}

{% code title="Bowtie2" %}
```sh
# Senario 2
cd /saw/datasets/reference

saw makeRef \
    --mode=Bowtie2 \
    --params-csv=/path/to/parameter/setting/Bowtie2_build.csv
```
{% endcode %}

`--params-csv` 中的参数设置内容：

{% code title="Bowtie2_build.csv" %}
```csv
Parameter,Value
,/path/to/host/FASTA1,/path/to/host/FASTA2,...
,<basename>
```
{% endcode %}

#### Kraken2 索引文件

Kraken2 是专为基因组的生物分类比对而设计开发的生信工具，在 `SAW count` **微生物比对分析**中，可以快速准确地识别环境样本或复杂微生物群落中存在的微生物，你可以从 [Kraken2 数据库网站](https://benlangmead.github.io/aws-indexes/k2) 下载所需数据库。

{% code title="Kraken2" %}
```sh
#Scenario 1 
cd /saw/datasets/reference

##Step 1 (optional) if needed,add FASTAs needed for a customed database
saw makeRef \
    --mode=Kraken2 \
    --fasta=/path/to/host/FASTA1,/path/to/host/FASTA2,... \
    --database=/path/to/Kraken2/database

##Step 2 build
saw makeRef \
    --mode=Kraken2 \
    --database=/path/to/Kraken2/database
```
{% endcode %}

{% hint style="warning" %}
构建 Kraken2 索引文件时，无需指定`--genome`参数，直接基于 database 数据进行构建。

在构建客制化 database 的 Step 2 之前，**需要在 database 目录下构建 `./taxonomy/`**，具体文件可以从 [NCBI/Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy) 获取。
{% endhint %}

运行命令行后，输出目录包含以下文件：

```sh
/saw/datasets/reference/Kraken2_db1
├── hash.k2d  ##Contains the minimizer to taxon mappings
├── opts.k2d  ##Contains information about the options used to build the database
├── taxo.k2d  ##Contains taxonomy information used to build the database
├── inspect.txt
├── seqid2taxid.map
├── database100mers.kmer_distrib
├── database150mers.kmer_distrib
├── database200mers.kmer_distrib
├── database250mers.kmer_distrib
├── database300mers.kmer_distrib
├── database50mers.kmer_distrib
└── database75mers.kmer_distrib
```

{% hint style="warning" %}
`SAW makeRef` 提构建索引时用到的基础、必要参数，用于 `SAW count` 的微生物分析。

有两种方法可实现 Kraken2 的全部功能。

* 使用原始 [Kraken2](https://github.com/DerrickWood/kraken2/wiki/Manual) 。
* 使用`--params-csv` 参数，调用 [Kraken2](https://github.com/DerrickWood/kraken2/wiki/Manual) 工具的原始参数命令。
{% endhint %}

{% code title="Kraken2" %}
```sh
#Scenario 2
cd /saw/datasets/reference

saw makeRef \
    --mode=Kraken2 \
    --params-csv=/path/to/parameter/setting/Kraken2_build.csv
```
{% endcode %}

`--params-csv` 中的参数设置内容：

{% code title="Kraken2_build.csv" %}
```csv
Parameter,Value
--add-to-library,/path/to/fasta
--db,/path/to/db
```
{% endcode %}

#### Reference libraries

在为 STAR、Bowtie2 和 Kraken2 构建索引文件后，需要构建一个 `--ref-libraries` 参数所需的配置 CSV，将微生物比对分析需要用到的数据文件进行整合。

```csv
Reference,Type
/saw/datasets/reference/transcriptome,STAR
/saw/datasets/reference/Bowtie2,Bowtie2
/saw/datasets/reference/Kraken2_db1,Kraken2
```

{% hint style="warning" %}
`--ref-libraries` 与 `--reference`两个参数不可同时使用！
{% endhint %}

## SAW checkGTF

`SAW count` 的分析任务只能接受标准格式的注释文件，所以在 `SAW count` 进行 reads 注释之前会自动校验文件。除了之外，还能够通过它实现特定注释信息内容的提取。&#x20;

{% hint style="info" %}
SAW 允许接入的注释文件的文件后缀名包括：gtf/gtf.gz、gff/gff.gz、gff3/gff3.gz 。
{% endhint %}

如果注释文件存在以下格式问题（常见的错误），`SAW checkGTF` 将进行简单地更正，以确保文件能够被正常使用。

<table><thead><tr><th width="392">Issue</th><th>Solution</th></tr></thead><tbody><tr><td>In the seventh column indicating the sense and antisense strands, "-" and "_" symbols are mistakenly mixed.</td><td>Check each row of the annotation file and correct the error symbol "_" to "-".</td></tr><tr><td>Any of "transcript_id", "transcription_name", "gene_id", "gene_name" is missed in GTF.</td><td>For each row, use the existing information of ID and name to fill in the missing items.</td></tr><tr><td>Part of gene or transcript rows are absent in GTF.</td><td>According to the attributes of exon rows, including gene, transcript, id and name, add the missing gene and transcript rows to the file.</td></tr><tr><td>Part of mRNA rows lack parent information in GFF.</td><td>Use the parent information of the previous neighboring record to fill in the missing one.</td></tr></tbody></table>

运行命令进行注释文件的格式检查：

```sh
saw checkGTF \
    --input-gtf=/path/to/input/GTF/or/GFF \
    --output-gtf=/path/to/output/GTF/or/GFF
```

If you want to extract specific annotations, like `gene_biotype:protein_coding` or `gene_biotype:lincRNA`, run as:

如果想要提取特定的注释信息，例如： `gene_biotype:protein_coding` 或 `gene_biotype:lincRNA`，可以这样运行程序：

```sh
saw checkGTF \
    --input-gtf=/path/to/input/GTF/or/GFF \
    --attribute=key:value \
    --output-gtf=/path/to/output/GTF/or/GFF
```

{% hint style="warning" %}
如果 `--attribute` 启用，`SAW checkGTF` 将提取特定的注释信息，但不进行文件格式的检查。
{% endhint %}
