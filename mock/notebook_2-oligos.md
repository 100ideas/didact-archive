```
intent: order fish barcoding primers from Eurofins
author: Mac Cowell
type: note
date: 2012-10-01 18:40:12.10 -7
project: "genelaser_test1"

# optional IO metadata
input:
  sequence.primer:
    - FISHCO1LBC
    - FISHCO1HBC
output:
  DNA.primer:
    - name: HC02198
      sequence: FISHCO1HBC
    - name: LCO1490
      sequence: FISHCO1LBC
```

Ordered 20 nmole salt-free "PCReady Primers" from Eurofins, confirmation no. 420814. $4.90 a piece.

```
// terse inline IO syntax
seq.primer:FISHCO1HBC -> DNA.primer:HC02198
seq.primer:FISHCO1LBC -> DNA.primer:LC01490
```

[file:"private/GMail - Eurofins MWG Operon - Order Confirmation 420814.pdf"]
