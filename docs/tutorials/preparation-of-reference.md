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

# Preparation of reference

SAW provides two complementary pipelines, `SAW makeRef` and `SAW checkGTF`, for genome reference and annotation files.\
Before running `SAW count`, one or more reference index files should be built in advance.

## SAW makeRef

A complementary tool for genome reference builds index files needed by `SAW count` pipeline.

{% hint style="info" %}
Because of the multiple uses of `makeRef` for three bioinformatical tools, `--mode` decides which one works.
{% endhint %}

### Transcriptome

#### For STAR

Annotation (GTF/GFF) and genome (FASTA) files are needed to build index files for read alignment during `SAW count` run.

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
Give a non-existent folder name to `--genome` parameter.
{% endhint %}

After running the command lines, a standard, SAW-compatible directory structure is automatically generated. The output folder, named according to `--genome`, includes all input FASTAs in `./transcriptome/fasta`, an annotation file in `./transcriptome/genes`, and STAR index files optimized by STOmics Tech in `./transcriptome/STAR`.

```sh
/saw/datasets/reference/transcriptome
├── fasta
│    └── genome.fa
├── genes
│    └── genes.gtf
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

#### With rRNA

If you plan to remove rRNA fragments during SAW analysis, use `--rRNA-FASTA` to mark the input rRNA information specifically, which will be added to `--fasta`.

{% hint style="info" %}
Key steps of the processing:

**Step 1:** given the rRNA fragments of `--rRNA-FASTA` are short and highly repetitive so that the pipeline will remove their redundancy first.

**Step 2:** add rRNA information to `--fasta` file(s), with the suffix '\_rRNA' on the chromosome, like '1\_rRNA', to distinguish rRNA ones from the basic genome.

**Step 3:** build index files using the genome integrated with de-duplicated rRNA information.
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

Also, the output is similar to the last one.

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

#### Simple use

Because of the organized output directory, set the `--reference` for `SAW count` like this:

```bash
...
--reference=/saw/datasets/reference/transcriptome
or 
--reference=/saw/datasets/reference/transcriptome_with_rRNA
```

### Microorganism

Microorganism analysis is now supported during `SAW count` of FFPE tissue samples! If you focus on the microbes of your FFPE analysis, [`--microorganism-detect`](../analysis/pipelines/saw-commands.md#saw-count) and [`--ref-libraries`](preparation-of-reference.md#reference-libraries) should be used together when running `SAW count`.

But before starting the pipeline, related index files should be built respectively, [STAR](preparation-of-reference.md#transcriptome) for host transcriptome alignment, [Bowtie2](preparation-of-reference.md#for-bowtie2) for de-host alignment, and [Kraken2](preparation-of-reference.md#for-kraken2) for a taxonomic classification of microbes.

#### For Bowtie2

In `SAW count`, **microorganism analysis** requires removing the host information from the unmapped reads. Bowtie2 plays an important role in the removal.

{% hint style="info" %}
The unmapped reads, from the `--unmapped-reads` of `SAW count`are input for de-host alignment.
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

After running the command lines, the output directory includes such files:

```sh
/saw/dataset/reference/Bowtie2
├── human_genome_rRNA.fa  ##host FASTA
├── human_genome_rRNA.1.bt2  ##Bowtie2 index files, suffixed with .bt2
├── human_genome_rRNA.2.bt2
├── human_genome_rRNA.3.bt2
├── human_genome_rRNA.4.bt2
├── human_genome_rRNA.rev.1.bt2
└── human_genome_rRNA.rev.2.bt2

```

{% hint style="info" %}
`SAW makeRef` provides simple and essential parameters from the `bowtie2-build` indexer, for basic microorganism analysis in `SAW count`.

Two ways to realize the full functionality of Bowtie2.

* Use the original [Bowtie2](https://bowtie-bio.sourceforge.net/bowtie2/manual.shtml) software.
* `--params-csv` for complex parameters of the original [Bowtie2](https://bowtie-bio.sourceforge.net/bowtie2/manual.shtml).
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

More about parameter setting CSV.

{% code title="Bowtie2_build.csv" %}
```csv
Parameter,Value
,/path/to/host/FASTA1,/path/to/host/FASTA2,...
,<basename>
```
{% endcode %}

{% file src="../img/assets/Bowtie2_build (1).csv" %}

#### For Kraken2

Kraken2 is specifically designed for the taxonomic classification of metagenomic sequences. In `SAW count`, **microorganism analysis** uses Kraken2 to quickly and accurately identify the microorganisms present in environmental samples or from complex microbial communities. Download the databases from [Kraken2 database website](https://benlangmead.github.io/aws-indexes/k2).

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

{% hint style="warning" %}
There is no need to input `--genome`for Kraken2 index files, modifications and additions happen under the database folder.

Before building a customed database (Step 2), you should **install a `./taxonomy/` under the database folder**, which can be obtained from [NCBI/Taxonomy](https://www.ncbi.nlm.nih.gov/taxonomy).
{% endhint %}

After running the command lines, the output directory includes such files:

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
`SAW makeRef` provides simple and essential parameters, for basic microorganism analysis in `SAW count`.

Two ways to realize the full functionality of Kraken2.

* Use the original [Kraken2](https://github.com/DerrickWood/kraken2/wiki/Manual).
* `--params-csv`for the complex parameters of the original [Kraken2](https://github.com/DerrickWood/kraken2/wiki/Manual).
{% endhint %}

```sh
#Scenario 2 
cd /saw/datasets/reference

saw makeRef \
    --mode=Kraken2 \
    --params-csv=/path/to/parameter/setting/Kraken2_build.csv
```

More about parameter setting CSV.

{% code title="Kraken2_build.csv" %}
```csv
Parameter,Value
--add-to-library,/path/to/fasta
--db,/path/to/db
```
{% endcode %}

{% file src="../img/assets/Kraken2_build (1).csv" %}

#### Reference libraries

After the construction of index files for STAR, Bowtie2 and Kraken2, a CSV of `--ref-libraries` can be built to combine all needed references for microorganism analysis.

```csv
Reference,Type
/saw/datasets/reference/transcriptome,STAR
/saw/datasets/reference/Bowtie2,Bowtie2
/saw/datasets/reference/Kraken2_db1,Kraken2
```

{% hint style="warning" %}
`--ref-libraries` is not compatible with `--reference`.
{% endhint %}

## SAW checkGTF

Annotation files in the standard format can be accepted by `SAW count`. The verification will be performed automatically before read alignment in `SAW count`. In addition to the usual format check, the extraction of specific annotations is also implemented.

{% hint style="info" %}
SAW accepts the annotation files suffix with`gtf/gtf.gz`, `gff/gff.gz`, `gff3/gff3.gz`.
{% endhint %}

If the file has the following formatting issues, which are common errors in annotation files, `SAW checkGTF` will fulfill the correction, to ensure the file can be used properly.

<table><thead><tr><th width="392">Issue</th><th>Solution</th></tr></thead><tbody><tr><td>In the seventh column indicating the sense and antisense strands, "-" and "_" symbols are mistakenly mixed.</td><td>Check each row of the annotation file and correct the error symbol "_" to "-".</td></tr><tr><td>Any of "transcript_id", "transcription_name", "gene_id", "gene_name" is missed in GTF.</td><td>For each row, use the existing information of ID and name to fill in the missing items.</td></tr><tr><td>Part of gene or transcript rows are absent in GTF.</td><td>According to the attributes of exon rows, including gene, transcript, id and name, add the missing gene and transcript rows to the file.</td></tr><tr><td>Part of mRNA rows lack parent information in GFF.</td><td>Use the parent information of the previous neighboring record to fill in the missing one.</td></tr></tbody></table>

A simple check runs as:

```sh
saw checkGTF \
    --input-gtf=/path/to/input/GTF/or/GFF \
    --output-gtf=/path/to/output/GTF/or/GFF
```

If you want to extract specific annotations, like `gene_biotype:protein_coding` or `gene_biotype:lincRNA`, run as:

```sh
saw checkGTF \
    --input-gtf=/path/to/input/GTF/or/GFF \
    --attribute=key:value \
    --output-gtf=/path/to/output/GTF/or/GFF
```

{% hint style="warning" %}
If `--attribute` works, `SAW checkGTF` will extract specific annotation records but not perform a format check.
{% endhint %}
