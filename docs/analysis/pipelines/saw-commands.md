# SAW commands

To display descriptions of a list of subcommands, run `saw --help | -h` . Check the software version with `saw --version`.

The snakemake is used for procedure construction and performing analysis.

## SAW count

Count gene expression reads and generate expression matrices from the Stereo-seq chip.

**Usage:** `saw count [Parameters] --id <ID> --sn <SN> --omics <OMICS> --kit-version <TEXT> --sequencing-type <TEXT>--reference <PATH> --image <IMG> --fastqs <PATH>`

`saw count --h | --help`

<table><thead><tr><th width="208">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--id &#x3C;ID></code></td><td>(Optional, default to None) A unique task id ([a-zA-Z0-9_-]+) which will be displayed as the output folder name and the title of HTML report. If the parameter is absent, <code>--sn</code> will play the same role.</td></tr><tr><td><code>--sn &#x3C;SN></code></td><td>(Required, default to None) SN (serial number) of the Stereo-seq chip.</td></tr><tr><td><code>--omics &#x3C;OMICS></code></td><td>(Required, default to "transcriptomics") Omics information.</td></tr><tr><td><code>--kit-version &#x3C;TEXT></code></td><td>(Required, default to None) The version of the product kit. More in <a href="count/">count pipeline introduction</a>.</td></tr><tr><td><code>--sequencing-type &#x3C;TEXT></code></td><td>(Required, default to None) Sequencing type of FASTQs which is recorded in the sequencing report.</td></tr><tr><td><code>--chip-mask &#x3C;MASK></code></td><td>(Required, default to None) Stereo-seq chip mask file.</td></tr><tr><td><code>--organism &#x3C;TEXT></code></td><td> (Optional, default to None) Organism type of sample, usually referring to species.</td></tr><tr><td><code>--tissue &#x3C;TEXT></code></td><td> (Optional, default to None) Physiological tissue of sample.</td></tr><tr><td><code>--reference &#x3C;PATH></code></td><td>(Optional, default to None) Path to the reference folder, containing SAW-compatible index files and GTF/GFF, built by <a href="../../tutorials/preparation-of-reference.md#for-star"><code>SAW makeRef</code></a>.</td></tr><tr><td><code>--ref-libraries &#x3C;CSV></code></td><td>(Optional, default to None) Path to a <a href="../../tutorials/preparation-of-reference.md#reference-libraries"><code>ref_libraries.csv</code></a> which declares reference indexes, built by <code>SAW makeRef</code>. Not compatible with <code>--reference</code>.</td></tr><tr><td><code>--fastqs &#x3C;PATH></code></td><td>(Required, default to None) Path(s) to folder(s), containing all needed FASTQs. If FASTQs are stored in multiple directories, use it as: <code>--fastqs=/path/to/directory1,/path/to/directory2,...</code>.  Notice that all FASTQ files under these directories will be loaded for analysis. </td></tr><tr><td><code>--microorganism-detect</code></td><td>(Optional, default to None) Whether to perform analysis related to microorganisms. Notice that the detection only works for FFPE assay currently.</td></tr><tr><td><code>--uniquely-mapped-only</code></td><td>(Optional, default to None) Only annotate on uniquely mapped reads during read annotation.</td></tr><tr><td><code>--rRNA-remove</code></td><td>(Optional, default to None) Whether to remove rRNA. Before turning the switch on, make sure that the necessary rRNA information has been added to FASTA, using <a href="../../tutorials/preparation-of-reference.md#with-rrna"><code>SAW makeRef</code></a>.</td></tr><tr><td><code>--clean-reads-fastq</code></td><td>(Optional, default to None) Whether to output the reads confidently mapped to the genome in Q4 FASTQ format.</td></tr><tr><td><code>--unmapped-STAR-fastq</code></td><td>(Optional, default to None) Whether to output unmapped reads in Q4 FASTQ format.</td></tr><tr><td><code>--unmapped-fastq</code></td><td>(Optional, default to None) Whether to output unmapped reads in Q4 FASTQ format (not including "too many loci" reads from STAR).</td></tr><tr><td><code>--image &#x3C;TIFF></code></td><td>(Optional, default to None) TIFF image for QC (quality control), combined with expression matrix for analysis.<br><strong>Name rule for input TIFF :</strong><br>a. <code>&#x3C;SN>_&#x3C;stain_type>.tif</code><br>b. <code>&#x3C;SN>_&#x3C;stain_type>.tiff</code><br>c. <code>&#x3C;SN>_&#x3C;stain_type>.TIF</code><br>d. <code>&#x3C;SN>_&#x3C;stain_type>.TIFF</code><br><strong>&#x3C;stainType> includes:</strong><br>a. ssDNA<br>b. DAPI<br>c. HE (referring to H&#x26;E)<br>d. &#x3C;IF_name1>_IF, &#x3C;IF_name2>_IF, ...</td></tr><tr><td><code>--image-tar &#x3C;TAR></code></td><td>(Optional, default to None)  The compressed image <code>.tar.gz</code> file from StereoMap has been through prepositive QC (quality control).</td></tr><tr><td><code>--output &#x3C;PATH></code> </td><td>(Optional, default to None) Set a specific output directory for the run.</td></tr><tr><td><code>--threads-num &#x3C;NUM></code></td><td>(Optional, default to 8) Allowed local cores to run the pipeline.</td></tr><tr><td><code>--memory &#x3C;NUM></code></td><td>(Optional, default to detected) Allowed local memory to run the pipeline.</td></tr><tr><td><code>--gpu-id &#x3C;NUM></code></td><td>(Optional, default to -1) Set GPU id, according to GPU resources in the computing environment. Default to <code>-1</code>, which means running the pipeline using the CPU. </td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

## SAW makeRef

Prepare for a reference used in `SAW count`.  GTF/GFF and FASTA files or additional specific rRNA FASTA files are needed.

**Usage:** `saw makeRef [Parameters] --mode <MODE> --fasta <FASTA> --gtf <GTF/GFF> --genome <PATH>`&#x20;

`saw makeRef -h | --help`

<table><thead><tr><th width="220">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--mode &#x3C;MODE></code></td><td>(Required, default to "STAR") Set the mode to build index files, used for the alignment. There are three modes, including STAR, Bowtie2 and Kraken2 for specific analysis scenarios.</td></tr><tr><td><code>--fasta &#x3C;FASTA></code></td><td>(Optional, default to None) Path to FASTA, to build index files. When it comes to multiple FASTAs, they will be integrated in order of input beforehand.</td></tr><tr><td><code>--rRNA-fasta &#x3C;FASTA></code></td><td>(Optional, default to None) Path to rRNA FASTA that will be added to <code>--fasta</code> file, with the elimination of redundant rRNA fragments.</td></tr><tr><td><code>--gtf &#x3C;GTF/GFF></code></td><td>(Optional, default to None) Path to input GTF/GFF to build index files.</td></tr><tr><td><code>--basename &#x3C;TEXT></code></td><td>(Optional, default to "host") Basename for Bowtie2 index files when set <code>mode=Bowtie2</code>. If not specified, "host" will be used, which straightforwardly means removing host information in the next step.</td></tr><tr><td><code>--database &#x3C;DATABASE></code></td><td>(Optional, default to None) Path to Kraken2 reference database. If the parameter works, output index files will be saved in the same directory level.</td></tr><tr><td><code>--genome &#x3C;PATH></code></td><td>(Optional, default to detected) Path to the output reference genome with index information.</td></tr><tr><td><code>--params-csv &#x3C;CSV></code></td><td>(Optional, default to detected) Path to CSV file, recording detailed parameters to build Bowtie2/Kraken2 index. It works when <code>--mode</code> is set to Bowtie2/Kraken2.More in <a href="../../tutorials/">Tutorials</a>.</td></tr><tr><td><code>--threads-num &#x3C;INT></code></td><td>(Optional, default to 8) Set the number of threads to use.</td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

## SAW checkGTF

Check whether an annotation file (GTF/GFF) is in the standard format, used in `SAW count`. In addition, extract specific information from GTF/GFF.

**Usage:** `saw checkGTF [Parameters] --input-gtf <GTF/GFF> --attribute <key:value> --output-gtf <GTF/GFF>`&#x20;

`saw checkGTF -h | --help`

<table><thead><tr><th width="224">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--input-gtf &#x3C;GTF/GFF></code></td><td>(Required, default to None) Path to input GTF/GFF, for a necessary format check.</td></tr><tr><td><code>--attribute &#x3C;key:value></code></td><td>(Optional, default to None) Extract specific annotation information from GTF/GFF. Input as &#x3C;gene_biotype:protein_coding>.</td></tr><tr><td><code>--output-gtf &#x3C;GTF/GFF></code></td><td>(Required, default to None) Path to output GTF/GFF after a necessary check, or additional filtration when performing <code>--attribute</code>.</td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

## SAW realign

Accept the manually processed compressed image file to restart the analysis with adjusted images. In the absence of images, lasso GeoJSON from StereoMap will be available.

**Usage:** `saw realign [Parameters] --id <ID> --sn <SN> --count-data <PATH> --realigned-image-tar <TAR>`

`saw realign -h | --help`

<table><thead><tr><th width="224">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>-id &#x3C;ID></code></td><td>(Optional, default to None) A unique task id ([a-zA-Z0-9_-]+) which will be displayed as the output folder name and the title of HTML report. If the parameter is absent, <code>--sn</code> will play the same role.</td></tr><tr><td><code>--sn &#x3C;SN></code></td><td>(Required, default to None) SN (serial number) of the Stereo-seq chip.</td></tr><tr><td><code>--count-data &#x3C;PATH></code></td><td>(Required, default to None) Output folder of the corresponding <code>SAW count</code> result, which mainly contains the expression matrices and other related datasets.</td></tr><tr><td><code>--realigned-image-tar &#x3C;TAR></code></td><td>(Required, default to None) Compressed image file from StereoMap, which has been manually processed, including stitching, tissue segmentation, cell segmentation, calibration and registration.</td></tr><tr><td><code>--lasso-geojson &#x3C;GEOJSON></code></td><td>(Optional, default to None) Lasso GeoJSON from StereoMap is used for tissue segmentation when the analysis is without images. It is incompatible with <code>--realigned-image-tar</code>.</td></tr><tr><td><code>--adjusted-distance &#x3C;INT></code></td><td>(Optional, default to 10) Outspread distance based on the cellular contour of the cell segmentation image, in pixels. Default to 10. If <code>--adjusted-distance=0</code>, the pipeline will not expand the cell border.</td></tr><tr><td><code>--no-matrix</code></td><td>(Optional, default to None) Whether to output feature expression matrices.</td></tr><tr><td><code>--no-report</code></td><td>(Optional, default to None) Whether to output HTML report.</td></tr><tr><td><code>--output &#x3C;PATH></code></td><td>(Optional, default to None) Set a specific output directory for the run.</td></tr><tr><td><code>--threads-num &#x3C;NUM></code></td><td>(Optional, default to 8) Set the number of threads to use.</td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

## SAW reanalyze

Perform secondary analysis, including clustering, differential expression analysis and lasso.&#x20;

**Usage:** `saw reanalyze [Parameters] --gef <GEF> --bin-size <INT> --marker --output <PATH>`

`saw reanalyze -h | --help`

<table><thead><tr><th width="224">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Optional, default to None) Input bin GEF file for analysis.</td></tr><tr><td><code>--cellbin-gef &#x3C;GEF></code></td><td>(Optional, default to None) Input cellbin GEF file for analysis.</td></tr><tr><td><code>--bin-size &#x3C;INT or LIST></code></td><td>(Optional, default to 200) Bin size for analysis.</td></tr><tr><td><code>--Leiden-resolution &#x3C;FLOAT></code></td><td>(Optional, default to 1.0) The resolution parameter controls the coarseness of the clustering when performing Leiden. Higher values lead to more clusters.</td></tr><tr><td><code>--marker</code></td><td>(Optional, default to None) Whether to perform differential expression analysis.</td></tr><tr><td><code>--count-data &#x3C;PATH></code></td><td>(Optional, default to None) Output folder of the corresponding <code>SAW count</code> result, which mainly contains the expression matrices and other related datasets.</td></tr><tr><td><code>--diffexp-geojson &#x3C;GEOJSON></code></td><td>(Optional, default to None) GeoJSON from StereoMap to analyze differential expression.</td></tr><tr><td><code>--lasso-geojson &#x3C;GEOJSON></code></td><td>(Optional, default to None) GeoJSON from StereoMap to lasso sub expression matrices of targeted regions.</td></tr><tr><td><code>--output &#x3C;PATH></code></td><td>(Optional, default to None) Path to the output folder, to save analysis results.</td></tr><tr><td><code>--threads-num &#x3C;NUM></code></td><td>(Optional, default to 8) Set the number of threads to use.</td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

## SAW convert

Carry out file format conversions. There are several modules under the pipeline to implement the analysis.&#x20;

**Usage:** `saw convert gef2gem [Parameters] --gef <GEF> --bin-size <INT> --marker --gem <GEM>`

`saw convert -h | --help`

<table><thead><tr><th width="224">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--threads-num &#x3C;NUM></code></td><td>(Optional, default to 8) Set the number of threads to use.</td></tr><tr><td><code>-h, --help</code></td><td>(Optional, default to None) Print help information.</td></tr></tbody></table>

### Matrix  related

#### `gef2gem`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Required, default to None) Path to input bin GEF file.</td></tr><tr><td><code>--bin-size &#x3C;INT></code></td><td>(Optional, default to 1) Bin size used during conversion.</td></tr><tr><td><code>--cellbin-gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to input cellbin GEF file.</td></tr><tr><td><code>--gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to output GEM file.</td></tr><tr><td><code>--cellbin-gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to output cellbin GEM file.</td></tr></tbody></table>

#### `gem2gef`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to input GEM file.</td></tr><tr><td><code>--gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to output bin GEF file.</td></tr><tr><td><code>--cellbin-gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to input cellbin GEM file.</td></tr><tr><td><code>--cellbin-gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to output cellbin GEF file.</td></tr></tbody></table>

#### `bin2cell`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Required, default to None) Path to input bin GEF file.</td></tr><tr><td><code>--image &#x3C;TIFF></code></td><td>(Required, default to None) Path to the image of cell segmentation.</td></tr><tr><td><code>--cellbin-gem &#x3C;GEM></code></td><td>(Required, default to None) Path to output cellbin GEM file.</td></tr><tr><td><code>--cellbin-gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to output cellbin GEF file.</td></tr></tbody></table>

#### `gef2h5ad`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to input bin GEF file.</td></tr><tr><td><code>--bin-size &#x3C;INT></code></td><td>(Optional, default to 20) Bin size used during conversion.</td></tr><tr><td><code>--cellbin-gef &#x3C;GEF></code></td><td>(Optional, default to None) Path to input cellbin GEF file.</td></tr><tr><td><code>--h5ad &#x3C;H5AD></code></td><td>(Required, default to None) Path to output AnnData H5AD file.</td></tr></tbody></table>

#### `gem2h5ad`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to input GEM file.</td></tr><tr><td><code>--bin-size &#x3C;INT></code></td><td>(Optional, default to 20) Bin size used during conversion.</td></tr><tr><td><code>--cellbin-gem &#x3C;GEM></code></td><td>(Optional, default to None) Path to input cellbin GEM file.</td></tr><tr><td><code>--h5ad &#x3C;H5AD></code></td><td>(Required, default to None) Path to output AnnData H5AD file.</td></tr></tbody></table>

#### `gef2img`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Required, default to None) Path to input bin GEF.</td></tr><tr><td><code>--bin-size &#x3C;INT></code></td><td>(Required, default to 1) Bin size used to plot expression heatmap.</td></tr><tr><td><code>--image &#x3C;TIFF></code></td><td>(Required, default to None) Path to output heatmap image.</td></tr></tbody></table>

#### `visualization`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--gef &#x3C;GEF></code></td><td>(Required, default to None) Path to input raw bin GEF file.</td></tr><tr><td><code>--bin-size &#x3C;INT></code></td><td>(Required, default to 1,5,10,20,50,100,150,200) Bin sizes used during conversion.</td></tr><tr><td><code>--visualization-gef &#x3C;GEF></code></td><td>(Required, default to None) Path to output visualization GEF file.</td></tr></tbody></table>

### Image related

#### `tar2img`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--image-tar &#x3C;TAR></code></td><td>(Required, default to None) Path to input image compressed tar file.</td></tr><tr><td><code>--image &#x3C;PATH></code></td><td>(Required, default to None) Path to output folder of images.</td></tr></tbody></table>

#### `img2rpi`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--image &#x3C;TIFF></code></td><td>(Required, default to None) Path to images, please note that the order of input images, corresponding to <code>--layers</code> names.</td></tr><tr><td><code>--layers &#x3C;TEXT></code></td><td>(Required, default to None) Layer names, recorded in the output RPI file, should correspond to images individually. Layer names can be set arbitrarily, but follow the format of <code>&#x3C;stain_type>/&#x3C;image_type></code>, like <code>DAPI/TissueMask</code>.</td></tr><tr><td><code>--rpi &#x3C;RPI></code></td><td>(Required, default to None) Path to output RPI file.</td></tr></tbody></table>

#### `merge`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--image &#x3C;TIFF></code></td><td>(Required, default to None) Path to input images (up to 3), to be merged into one image, in the color order of R-G-B.</td></tr><tr><td><code>--merged-image &#x3C;TIFF></code></td><td>(Required, default to None) Path to output multichannel image.</td></tr></tbody></table>

#### `overlay`

<table><thead><tr><th width="212">Parameter</th><th>Description</th></tr></thead><tbody><tr><td><code>--image &#x3C;TIFF></code></td><td>(Required, default to None) Path to image, used to be the base one.</td></tr><tr><td><code>--template &#x3C;TXT></code></td><td>(Required, default to None) Point information of matrix template.</td></tr><tr><td><code>--overlaid-image &#x3C;TIFF></code></td><td>(Required, default to None) Path to output overlaid image, with the cover of a template.</td></tr></tbody></table>

