# 测序 FASTQ

## 概览

FASTQ 是一种常见的存储测序和质量评估信息的数据格式。Stereo-seq 的测序方法是双端测序 （paired-end, PE）。Read 1 包含坐标信息（Coordinate ID，CID）和分子信息（Molecular ID，MID），read 2 包含探针捕获的 RNA 测序数据。在多样本测序过程中，会添加一个额外的样本条形码（sample barcode）序列来识别样本。当测序数据不准确时，会进行过滤，从 read 1 及其配对的 read 2 中移除低质量的 MID 序列（MID中包含 N 碱基或有两个及两个以上碱基的质量值低于10）。然后，过滤后的 read 2 的 read ID 后会附加上 CID 和 MID 信息。Read 2 中包含 RNA 数据的单链被写入 FASTQ 格式的文件中，作为原始测序数据，注意，此时已经去除了样本条形码。&#x20;

## 质量值记录

Q40 FASTQ 和 Q4 FASTQ 是记录原始测序数据的碱基质量值的两种方式。两者区别为质量评估体系不同，Q40 采用了41个质量值描述测序碱基的质量，Q4 中只有4个质量值。

## 存储类型

**成对 FASTQ** 和**成组 FASTQ** 是原始测序数据的两种可选输出格式。

{% hint style="warning" %}
注意：FASTQ 中的质量值记录方式与其文件的存储类型无关。
{% endhint %}

成对的 FASTQs 包括一对 read 文件，read 1 用于记录 CID、MID 信息，read 2 用于记录探针捕获的 RNA 测序数据。下面是 成对 FASTQ 的一个示例：

```Bash
# read 1
@E100026571L1C001R00300000000/1
TGTCCAACGGAGACGGCTCCGACAAGGCACTGGCA
+
>DG;<BGH=>*EFE8*G/3E@2:F0-GBGG188F<

# read 2
@E100026571L1C001R00300000000/2
GTCTCACCATACTTTTACAAAGTTATTTCAACCCAAATCACAATTTAAGAATTATTTGTTCTACCTATGCCACACTTTAAATAAATGTCTATTAAAACCA
+
-GFEECG?ECBFF<=@A@<E@><;FGCF=>=E53FEF5>FGF@,0ADE9CEAG2GBE@HF3EA<CE;G2F@=G8=?@G9FBGE.EG6G2;974E*D9DE9
```

成组 FASTQ 格式通常为一个 read 文件，但其脱身于一个组，每组数据由16或64个单独的 read 文件构成。read 文件中的 read ID 以“@”开头，包括 read 名称和经过编码的 CID 和 MID 信息。序列部分包含捕获的 RNA 测序数据。由于文件为组合格式，和并且减少了评估的质量值数量，存储空间大大减少。下面是成组 FASTQ 的一个示例：

```Bash
@FP300000513L1C002R00400000218 CE242DF29A57 97D26
GTGTAGTGAACCCCATGGTAGTTTTCTGATTGTTGTTAAAAAAAATGACTTAACATATTACATGGACACTCAATAAAAATGTTTTATTTCCTGTTGAAAA
+
FFFFFFFFFFFF8F8FFFFFFFFFFFFF8FFFFFFFFF8FF8FFF8FFFFFFF,FFFFFFFFFFF8FFFFFF8F8F,F8FFFFFF,FFFFFFFFFF,FFF
```

## 名称前缀规范

Stereo-seq 的原始测序数据根据存储类型分为两类，它们的文件名有自己的规则。`--fastqs` 参数需要一个或多个文件夹路径，文件夹下的所有 FASTQ 文件都会进入到 `SAW count` 分析流程中，所以，请注意你的输入目录。&#x20;

对于成对 FASTQ，文件名前缀分别表示测序 slide、lane 编号和 read 索引，标准的成对 FASTQ 文件遵循以下命名方式： `<slide>_<lane_number>_<read_index>.fq.gz`。

成对 FASTQ 文件和目录结构类似：

```
/saw/datasets/Q40_fastqs
                ├── TestFlowcell01_L01_read_1.fq.gz
                ├── TestFlowcell01_L01_read_2.fq.gz
                ├── TestFlowcell01_L03_read_1.fq.gz
                ├── TestFlowcell01_L03_read_2.fq.gz
                └── ...
```

对于成组 FASTQ，文件名前缀表示测序流 slide、lane 编号、样本条形码和拆分索引编号，标准成组 FASTQ 文件遵循以下命名方式：`<slide>_<lane_number>_<sample_barcode>_<split_index>.fq.gz`.&#x20;

{% hint style="warning" %}
由于成组 FASTQ 数据是拆分后进行存储的，需要以组为单位被使用，每组包含 16 或 64 个文件。
{% endhint %}

成组 FASTQ 文件和目录结构类似：

```
/saw/datasets/Q4_fastqs
               ├── TestFlowcell02_L01_25_1.fq.gz
               ├── TestFlowcell02_L01_25_2.fq.gz
               ├── TestFlowcell02_L01_25_3.fq.gz
               ├── TestFlowcell02_L01_25_4.fq.gz
               ├── TestFlowcell02_L01_25_5.fq.gz
               ├── TestFlowcell02_L01_25_6.fq.gz
               ├── TestFlowcell02_L01_25_7.fq.gz
               ├── TestFlowcell02_L01_25_8.fq.gz
               ├── TestFlowcell02_L01_25_9.fq.gz
               ├── TestFlowcell02_L01_25_10.fq.gz
               ├── TestFlowcell02_L01_25_11.fq.gz
               ├── TestFlowcell02_L01_25_12.fq.gz
               ├── TestFlowcell02_L01_25_13.fq.gz
               ├── TestFlowcell02_L01_25_14.fq.gz
               ├── TestFlowcell02_L01_25_15.fq.gz
               ├── TestFlowcell02_L01_25_16.fq.gz
               └── ...
```

{% hint style="danger" %}
在`SAW count`分析流程中，**成对**和**成组**的 FASTQ 测序数据不能混用。
{% endhint %}

