```
note:
  timestamp: 2012-10-03 11:13:12.10 -7
  intent: "test epibio quickextract kit with fish tissue"
  project: "genelaser_test1"
```

Testing out genomic purification using EpiBio QuickExtract kit. Trying 6 samples to start:

```
samples[epibiotest1]:
  lc: "left cheek, rubbed 10 sec"
  ham: "hamachi sample from Moshi Moshi takeout order"
  mak: "maki sample from Moshi Moshi takeout order"
  neg: "negative control, nothing swabbing"
  col: "positive control, 100 mg of frozen tuna tissue from sample:2122"
  tab: "table top, 5cm streak rubbed 30 sec"
  _file: "samples/2012-10-03_epibiotest1.csv"
```

First protocol! woot. This content is still part of the first <note> block.

Above see sample data stored inline. Should this be the canonical place for it? Or should it reside in a more central json file and be included by reference? Which is less likely for users to screw up...?

`[img:"data/2012-10-03_epibiotest1_sushi_samples.jpg"]`


<div class="page-break"></div>

--------------------------------------------------------------------------------


```
op[1]:
  timestamp: 2012-10-03 11:22:01.33 -7
  protocol: Epibio-quickextract-1@ceba48e
  samples: epibiotest1
  qc: op[2]
```

A new note block! This one is associated with the `Epibio-quickextract-1`
operation block above. This is where we would write any notes about how the protocol went.


--------------------------------------------------------------------------------


```
op[2]:
  timestamp: 2012-10-03 11:40:12.53 -7
  protocol: nanodrop_OD-260-280
  in: op[1]
  out: "data/qc/2012-10-03.csv"
```    

Another Note (or is it operation?).

`[table:"data/qc/2012-10-03.csv"]` <-- viewer renders inline

Quickextract seems to work; deviation in gDNA concentration might be a problem. Their whitepaper suggests a range of 7 - 25 ng / uL when it's working properly. `[ref:2012Weight]`.

Also see `[doi:10.1007/978-1-61779-591-6_6]`.

--------------------------------------------------------------------------------

<div class="page-break"></div>


    Notebook files have two kinds of top-level metadata blocks: <operation> and
    <note>. <note>s are associated with the closest preceding <operation>. <note>s
    can contain data tables, sample tables, protocol definitions, etc.,
    represented inline or by reference via json or yaml blocks.   

    <note>s begin with `timestamp: <isodate>` metadata block. Additional metadata is
    inherited from the project.json file   

    render samples as table view;
    TODO how is it automagically stored in samples/2012-10-03_genelaser-test1.csv?
    organize content by experiment? i.e.

      experiments/
      ├── 2012-10-03_genelaser-test1/
      ├──── index.md
      ├──── samples.csv
      ├──── images/
      ├──── data/
      ├──── notes/
      ├── 2012-10-06_another-test1/
      ├──── index.md
      ├──── data/
      ├──── notes/
      index.md
      private/
      project.json
      protocols/
      plugins/
      references/
      ├── references.bib
      ├── 2010 weight DNA Barcoding Fishes.pdf

    explicit in/out tags (no typerange tho) in <op> definition   

    op:
      _id: 1
      timestamp: 2012-10-03 11:22:01.33 -7
      protocol: Epibio-quickextract-1@ceba48e
      in: cells.tissue # <-- implicit
      out: DNA.genomic # <-- implicit
      samples: [epibiotest1, epibiotest1_rep2]
      qc: op[2]
