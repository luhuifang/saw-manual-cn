# Analysis with GPU

SAW software now supports utilizing GPU resources for running analysis. The cell segmentation step in the `SAW count` pipeline is a time-consuming process. If the GPU is enabled for calculations, the task's running time will be greatly shortened.

{% hint style="info" %}
Here we take the NVIDIA graphics card as an example to explain how to call GPU to start `SAW count` run.
{% endhint %}

## Driver installation

SAW pipelines are run on Linux for analysis. After your Linux server is connected to one or more NVIDIA graphics cards, ensure that the appropriate driver has been installed. If not, follow the [NVIDIA CUDA Installation Guide for Linux](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/) to install CUDA.

## Check GPU resources

After installing CUDA, check GPU resources in your environment as:

```bash
$ nvidia-smi

Tue Jun  4 05:20:12 2024       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 515.65.01    Driver Version: 515.65.01    CUDA Version: 11.7     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  Tesla T4            Off  | 00000000:17:00.0 Off |                    0 |
| N/A   28C    P8    16W /  70W |      4MiB / 15360MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   1  Tesla T4            Off  | 00000000:65:00.0 Off |                    0 |
| N/A   34C    P0    26W /  70W |   1259MiB / 15360MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   2  Tesla T4            Off  | 00000000:CA:00.0 Off |                    0 |
| N/A   36C    P0    28W /  70W |    641MiB / 15360MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
|   3  Tesla T4            Off  | 00000000:E3:00.0 Off |                    0 |
| N/A   65C    P0    66W /  70W |  14439MiB / 15360MiB |     99%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    1   N/A  N/A     83410      C   .../envs/cellbin2/bin/python     1255MiB |
|    2   N/A  N/A     84598      C   .../envs/cellbin2/bin/python      637MiB |
|    3   N/A  N/A     15814      C   python                          14435MiB |
+-----------------------------------------------------------------------------+
```

In the first table `NVIDIA-SMI`, you can intuitively find that there are 4 GPU graphics cards and the serial number of each one, its corresponding fan speed, card name, and performance status. The remaining detailed parameters involve GPU usage, video memory usage, etc., which will not be introduced in detail here.

The second table, `Processes`, displays the video memory usage, process number, and GPU occupied by each process.

## Start with GPU

`--gpu-id` is configured to detect a GPU graphics card. Based on the GPU resource distribution in your cluster environment, choose an appropriate serial number for `--gpu-id`. If no one is detected, SAW count will not start the run, instead of using the CPU.

Run the analysis as:

```bash
cd /saw/runs

saw count \
    --id=Demo_Mouse_Brain_with_GPU \
    --sn=C04144D5\
    --omics=transcriptomics \
    --kit-version="Stereo-seq N FFPE V1.0" \
    --sequencing-type="PE75_25+59" \
    --chip-mask=/saw/datasets/chip_mask/C04144D5.barcodeToPos.h5 \
    --fastqs=/saw/datasets/fastqs \
    --reference=/saw/datasets/reference/mouse_transcriptome \
    --image-tar=/saw/datasets/image/C04144D5_SC_20240620_153.tar.gz \
    --gpu-id=0
    
```

{% hint style="warning" %}
`SAW realign` does not support computing using GPUs currently.
{% endhint %}
