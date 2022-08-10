const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

let web3Modal, hash_proof, provider, web3, contract, user_address, checkInterval, final_cost

let publicMint = false
var mint_count = 1;
var max_count = 2;
var mint_costs; // Change cost here
var chainId = 1; // should be 4 for rinkeby and 1 for mainnet

var t_address = "0x79F53bA3074eb79A9D3d187C3725F97658019ecA"
var t_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"ApprovalCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"ApprovalQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"ApprovalToCurrentOwner","type":"error"},{"inputs":[],"name":"ApproveToCaller","type":"error"},{"inputs":[],"name":"BalanceQueryForZeroAddress","type":"error"},{"inputs":[],"name":"MintToZeroAddress","type":"error"},{"inputs":[],"name":"MintZeroQuantity","type":"error"},{"inputs":[],"name":"OwnerQueryForNonexistentToken","type":"error"},{"inputs":[],"name":"TransferCallerNotOwnerNorApproved","type":"error"},{"inputs":[],"name":"TransferFromIncorrectOwner","type":"error"},{"inputs":[],"name":"TransferToNonERC721ReceiverImplementer","type":"error"},{"inputs":[],"name":"TransferToZeroAddress","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"Airdrop","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"MaxMintPublic","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MaxMintWL","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"}],"name":"OwnerMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"PublicCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PublicSalePaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"},{"internalType":"address","name":"_receiver","type":"address"}],"name":"Reserve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"WLCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WLPaused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenID","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hiddenURL","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxSupply","outputs":[{"internalType":"uint16","name":"","type":"uint16"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint16","name":"_mintAmount","type":"uint16"}],"name":"publicMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reveal","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriPrefix","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_uriPrefix","type":"string"}],"name":"setHiddenUri","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_limit","type":"uint8"}],"name":"setMaxMintPublic","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"_limit","type":"uint8"}],"name":"setMaxMintWL","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setPublicCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setPublicSalePaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setRevealed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_cost","type":"uint256"}],"name":"setWLCost","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setWLPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_whitelistMerkleRoot","type":"bytes32"}],"name":"setWhitelistMerkleRoot","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"uriPrefix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"uriSuffix","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"whitelistMerkleRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"_mintAmount","type":"uint8"},{"internalType":"bytes32[]","name":"merkleProof","type":"bytes32[]"}],"name":"whitelistMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

let whitelistAddresses = [
    "0x50f3c833fdb82df9b0f2a06da5a329c0f26c0455",
"0x70e5d45f1bda141def42179c9094aed5b1655a31",
"0x848e7cc40d05aacf5db1283dea1038bc079d47f3",
"0xe92a1bd5c8c53afe415e09902443b1c8c505295b",
"0x48a78a1a2d5e02302285cd3d41336d1e54e2f018",
"0xb815fd26711ead7932cf9090fbfac92c4f46190f",
"0x48928218a317a373ee5de442ab4915e3398fa833",
"0xf89d75c09c9e133c2e4f3cd213a117080a6e358f",
"0xf8971d48ac34c4434dec5cd2da76e0fb37e6c8b2",
"0x85b826b5eb230d03ce1bb41ded646909bf0c3f4e",
"0x30fcaa0829bb0001398b5f460c75d573efed7c83",
"0xe9c2d22736aebd78b0dac9676145560295603326",
"0xf8ea6d9ae0ac4fa77085b6ec2a7cc9647aa63d12",
"0x1d703938de4d2043b11a0df8ea665dffc6921ff8",
"0x9cac5110e5abb489b57becb84a1ee84e3cd47401",
"0x78d607f219a49915bf5b45d8e6a2eba597457bf4",
"0xde786be4730dde5d2ff477c0d5067a35a8be7a00",
"0x32de038a5ad9845fc6d077f73a85cc9c61115314",
"0x156f04af1a796d1b9fca58b5112722d0de0f347f",
"0x3127d515a2e8c3610e2fee8ed54a957acdb0c0b4",
"0x0094165b2c5ac0d3f1c374c59a68678ba77bd600",
"0xd2dbfe7a72c575b1cdd92e403095d1d7b9f41ff6",
"0x4b28d6b2dbe5edb26c52fd029a5fc142caf856b7",
"0x7f5ee6822208b8113d69b0827e9d397236c8ed11",
"0x4d9c87dfb65ef4c4ef90bb037991817d8c002070",
"0x2e674a7c96ce00d28590a2f51f0f37d8c1226458",
"0x345d5e70b1b0489a9d31e455cd5b3b8e77d089b7",
"0xf7ef3935acb22079c7c2107f7a2f508c76b431eb",
"0x00b627f7da55c3e09100b75c1414e751d9d89bdc",
"0x25f96640f3a97f42dcdf7d18709a6a955c986de4",
"0xb69e9fda00649b64387996e8e757ca1537da4ca2",
"0xc43629b0050752a69df4ae9e2b89a287fbbf3bdd",
"0xc8ea3c5e1d4dbe9ea24dfffb8403167f5665c46f",
"0x2e629e672997538f243bb017918178d72ff2d3af",
"0xc87e386eff7f16fa0d8c52e0d0252b310a75799b",
"0x6a20f50de18a344ec9aa90bef03d33e30bc3517e",
"0x3c74e3e07d32052a71b358123309c9e409d36aad",
"0x9eb73930a95dd08845fa42bfc21b573da7a62e3b",
"0x4e174e11d4e8d92cd69305b29e265a75b6333191",
"0xf04acbec3921bc0d33ce0b2673592d0a48796c9c",
"0x6ed96409f21f3305c8378b9e93c17ed13c9ea7cc",
"0x4d189d1097b80a0ac033caae55121f7af8218ac8",
"0x836b655cc75d50454c813f6340fa4e52c744af11",
"0xcec2a45cc23bf75ff8f4fc0712b04351f5df17f5",
"0xa7835dca5ed50692922a895309f2cee09e9facaa",
"0xb77b2cddd60cfd880583294c2f71bf128d55fa56",
"0x97475b0aa0b97809f285727612cc573b5b61be41",
"0x74e254f0ea90e8caa5da6f62ee29b9f71eea8ee5",
"0xa745bef759f71037dadd3f41ce6d87467217fc72",
"0xd37d6c54cf9974e6e3a78167fdfe40ecedf2be4d",
"0xd63c2b1649a1f5e2bb7a4d09a66b74d0b23dfd07",
"0x58d4d217edee175f2189d83cf1918ef2d1496954",
"0xc69791b2cd4e02f2f1e44b31c9ff1c676855be5b",
"0xd2f7148ddb8c1260b83eff9418205162eafab577",
"0xf30d58bc5360cb3295b16d04ba9bcac0ba898fb5",
"0xa55a98cd4ce5130fac9fe590cc8b87b3489e3fb5",
"0x2f508be8ac24d694b796411b35330aab7c40e913",
"0x948a4dbdaccb4d10b9395b4c863d34e335e3eb21",
"0x2f67d2dc893831f76631e4bc647cd38ae92d81a8",
"0x547ddd551f8f0cb6ed2bebf1d83cfc2afdfc4a18",
"0x957453bed7669229def37c8b7c7a4d039dca2f66",
"0xa3c8b4802acd755c899d111ffb68501ba630341d",
"0xc849744ccb7fcd29ffd33d6f440ffe3194187b48",
"0xf34031acc1c3b15359ef87b349cefdc407a7343e",
"0x53e01d7fb9ad1383b2cf296c6686d926c5b693b8",
"0x70cb16680e6c493ff0afa2d217470da464e59d04",
"0xe4aacd0ac7db73d07dffb2d17ce0f3e524ca2080",
"0x3d18c535baf848002679596ce0b46f5f73b2c328",
"0x5426e1a79e3c4590e9b7fb7055eacffc142ad71b",
"0x40b22a0591ade9436e464589bac643cd123016c3",
"0xcbcb59fa0f64126114312bb8eba32b13ef0c28c4",
"0x718f235a18d57560812c4d93ae03c6846b959503",
"0xd7a571190981bd8ead9d5841b74e8a12c14ebe2b",
"0x589f4fc12025daeb882bbd1a4b8e5e5abf1269a4",
"0x6abfe43351d55836fa1eed7b8797d7b48706fdfd",
"0xeefa026575308cf6383a1740d90ea035db27e323",
"0x90d4e02c2aa631970364113a8b705a1830940d44",
"0x188eed80a4d7eae7b4869d28c542d5d9014cf8fe",
"0x25a7127b7d9a0522a641a72145e4bcbe2c377bb7",
"0xbcc6c58bdd3ae72fdd99328c9a8d5bbdbc6236a2",
"0x7412830818ca4dd08cc8f75904354f68883b987b",
"0xa2f225fe5cea90aff4c1411593d9fbbb2b5cce5c",
"0x0b50aa75bab145d07b1c204ac777e580a0e8d711",
"0xc52f7e160fbe81597341dc37753c79b4f086272a",
"0xca126b1df87e3df799d59b14b0677fa8b2f3e98a",
"0xc45e9d4c43c622bf215c9270172174fd63921ab7",
"0x1bdea6535c8b271e606cd88a36da948e718f5bf9",
"0x28d5f0758829e8e94f528e1057a832028bbdfc99",
"0xfa95bc16934fe9d21caf1c121ca2def600dd832c",
"0x6052dbd1151ccb51ac160d4092d51e01314c5821",
"0xb73307d92316732860662f2f5b7c6329654ecefd",
"0x6f2d35802f2289995f90c2159bc3422595209e68",
"0x512aea95487116ba6f949d0aa1aa7e28f10e6d66",
"0x86431c88ecc9aca1ff763a2b1be7fc475fa7479c",
"0xf35dcaf0661c2577aa9c42bc1f44049f39273184",
"0xea03d64cefcd26d2bb0b90c5239cfffc7ce721c5",
"0x3922e9fa1ca107d979bc791bdd2462b1fdeed386",
"0xfb4bd495f93e1906681a2ad35167e649aac86683",
"0x0ca04a18cc650428f5c0c363e09c48b3cf204f9d",
"0x9ac02af87431dd8497a1eadbb076d1cf2d31eb4d",
"0xbec4a3f1c8c45642dfdee67d04c6d53441fb3c87",
"0x3b1551cbf174d0641324f17f569eecccb37c5776",
"0xf6f53ffbcc05a5919a8cab890bf1057e691b3a44",
"0x55bf821bbc7058ba4a49810107ca87c3550c067f",
"0x736a4184379418c9eb5364ff71c1cfb9b09831d4",
"0x654c60a1f9a866011f462f8158c6b62d62c41348",
"0x83df0c89b35fb861aa71c061275645d0ece76c76",
"0x07cf88429bae86e96767ae87116f1e722cc9770d",
"0xbe99d16afa04f120bb203b46dfc856c036a7983a",
"0xc1bd4465c2bd8db43e58fdc93cf289bcf336981d",
"0xad9d2bf8ead4f274a77e5fff56610b39228968bd",
"0xf9a8bec591a0045c695983fed4af13648536ddca",
"0x6b0935f47f7c3fe23c8b558b00dc26944b0eb562",
"0x7e5b4bc2c8c0ce55931ec687442b13c21ab3601a",
"0xdbd70323e12bd146a0ebcc80bd275fb961b42125",
"0x99edda93a8d2f4feab864546b6d23c91d0c4292d",
"0x3214e59acfa3ed9a8c561136d2bcd721de702abf",
"0x2dd534dd4949ccdbb301d29b15d8b86111ee4ae1",
"0x627b63da1391deac116397a09a6efc644375709e",
"0x01fc666b08080edd41b91d21b40010fce9dc8aa4",
"0xe5cd6c3caca30bcb4374827c640e27c3c64abb43",
"0xd6060e30701fa71c86237d18b8b1740d8d273365",
"0xf428d69c611de970016eefbda9b6a9b1c1b491e8",
"0xa4c5802aa89960b6e0f0bf2f1a5f8d8cb696eece",
"0x22c9b5b117993c061153e0323a6b22deef4433aa",
"0x1ea2246dc2266351a9e83a2cfa8c62068ea88f20",
"0xbbd6e0a6a1ba389e5d11535a0c159c1b4be25054",
"0x17ce6fec6ea92d7089d1cda382548527b4831e8c",
"0xce25c0f00509914e75969b16fa40b66ff31644f4",
"0x03623ff3d554aeef92441c92c4c3a8491b921103",
"0xdd46d896343f78abc726ea93bc96cbb04bc31326",
"0xcb328814d932c482031f9ca496d16b32c04a6ad7",
"0x0f7d4cfa525e34446e9b334db586bc90efcc1d6c",
"0x74e30e84b1c14c68fbea09517fa8c9411dd9e75c",
"0x83402b978e6c9127d9729165a37785e64408890a",
"0x4B8dDE1d16c7BE7FE3a95AD8a3518CD86A8364A0",
"0xfa2a56c6cfa68deea34f2640b259036fe824a2e9",
"0x1414c5bd97f8c6eed5695a1264fa202ef70892f9",
"0xc44b49aa4404bed31b6e9b7ec7a4922281c83e8b",
"0x950cd838d9e5994d197967328e5ac0ae8fd5d9ad",
"0xea2e784b8dc5752dad9542764d87248665840119",
"0x7e31943ce984248432322483a8522bf8bc85daf0",
"0x436037ad01adf08bc040ca34b7b54b31e6381164",
"0xcae3e30af608a22fbd2c3bfe7a181bfe75774abd",
"0x063d1da5a3b544b87528c2ebeaeb7f0dda589c9d",
"0x87a5ee283e602718957fdc1a4a60f1cd290500ea",
"0xa447390d24e7d31c34905a207582551bad518a7e",
"0xc3b029ebc26ec6f08b560c4dc033df261fd0f715",
"0x35536e6ec16134a2b71093975601a515b40ff143",
"0xaa0c89b31b9845f1686c9d20d457f3241410b01c",
"0x0953678ac2ee8571486ca9f94d3306d403cc76c0",
"0xb75e827aaf5c204f1e375b0d52e4a6d1ba0b94e5",
"0x97c8becdb6bdb1bfc0a789cc240f0e126c9a3feb",
"0x0be848e6db55564b186c6373e781c6a141eef067",
"0x5ec62034dd3b198763c72e5ae775fad3990973b3",
"0x057506e5b15f85d7ecaa82a0327fdbd8021f8f55",
"0xdb912fab7ab5fd40f17fd470573b3b999c62232c",
"0xa16231d4da9d49968d2191328102f6731ef78fca",
"0x0f0a6e280d3b478c43baf306907a5b665d165cc9",
"0x4c803604214e2e4ea4a1e62d12d91389b2f8ecf5",
"0x24cad7ed3cf32e26a9577a87ceb5130f20bf6582",
"0x055b6328faea08bfad770cf3e2d86b6a04c3b83c",
"0xf2bd3daea43ed0e66bbdf5ac8b0bc853903b3187",
"0x3bbc207665749fe728d19f1148d693c273ec4bbd",
"0xa45027f92f8b29b4e2c4de5e14e05b19d528fec1",
"0x90d97772f4469df443273d2946aaebd5158f75af",
"0xc44ea413c0b54c2aa2a51c6418feb6d8f87253f7",
"0xcd9cf83dd90b9b8ebcfe3de49f6dacc97eaf0f7f",
"0xeec71187b4a77f62a69f9589db3a3a1375f9ee69",
"0xde393b2ac88f082a8035498720ce88d757e9a2c4",
"0x017a251cfb4b5b4e91d19b13aed2a1d25d547a20",
"0x5fd6ca5c0c182ea12280801d9e360cce9fa896a3",
"0x0556904c57ef2187e66a4c593f19dd985f67e017",
"0x92e4568de1ccd2143d10532e9e5eded554993234",
"0x0e1d3b2bb2eeabcbb61838ce3cd30cd88dbc444f",
"0x315e80867db0b454461787f29993f2557f0d2710",
"0xff22866352aa2d6d2b3fc84f383078c4afe147de",
"0xcc982c45c627f3521b5230a5b48ef7ca6d07dc7d",
"0xf530334cf3dc73ba38932da973f398e55ae34ed8",
"0x6ab7b619e11dd533a2b01c51d5d6db37829b2706",
"0xaa181725be28dd1b26c3b1182b9c4b01813ffb6f",
"0xf00da011f7bc12d253ac33b9965f506d8787ae26",
"0x30c52607d336c02741c79c3e23348e757939e484",
"0x78b876ba0ad5734ba85c6223982c923824535577",
"0xd47b1fd7e4baf6cc4643edb54e6d9fce9318485e",
"0x7d5146cc6b80e50328854703569d42dac49019b4",
"0xe975d5a49a0e2782a465c608788de05a0212dd99",
"0x15277a4c1a9d6acfb6cf3fa90e4f5b0c76d95d33",
"0xf9d1db2e4c9b05b1df31b1aefc2a042f0a7a0eb6",
"0x8912979be3b51bb4ff69021a1fb6afc155fc7818",
"0x43f40c8a06e16d2a9fe37ca32a65c11d3f9814f2",
"0x8c4d59de14cc173c3ed7a371cb2a62fb4d8c5f74",
"0xc1218a093c3b5c8a79b6203145cea3192427f54a",
"0x30f85589458e2bd9bfb4cec36cdd4a709fc62594",
"0xa35a34d63bc6ae2b9ba676596db9de7db5fcca32",
"0x0456675bbd2aaaea968ecd9656590af3bcae8fce",
"0xa412a779934ab9bb041cd196f13470a16dee9a47",
"0xd703ef58802c0a924b825f7a8607140423b4f54f",
"0xd1a5105b7fa3099e98872354d52df3b9c86c764a",
"0x961e396fa10afd2c9da8f3216d0c0fd9a7bb23d2",
"0x29813c4ed6963d6da761188c5afdfb60c0331d49",
"0xcb278841b7f4b2796b09af324434dff4f0a4a7a1",
"0xce92877308f6805919faa0db8771d927a07f5a62",
"0x29829f83f67179f778f9e26d8e3be4b6ff4f999c",
"0x82d3e50df5aa6a4d9211d856798bcbf822b5bf29",
"0x3654190979d3efc8062c083ae7511f7fad722a49",
"0x4fd8d2f7d7c8344a35db2816ade89a93f95ed00e",
"0xfc631233d1ce1bc73b63b1700a326abec078ea2a",
"0xa0d9dddde3d76398bab937211155e9f86232fa29",
"0xb01c61ebbcd3ec84cbc72bf77fec2a3bafa66da3",
"0x037dcd0d9b7e0f6e8b41473cf2cd2dd31e462abc",
"0x9e838735b5f967755dd1bede28c39fec0f515a5d",
"0xd0286c7c5bed5229f732efe0c6d0c2cf5b7254d7",
"0x764dc54a6ab91f8a619b97e41a3e591f74969bbb",
"0x369488f5ad902eb2eb0a71cf686c59b88ee849f1",
"0xaffeec6078ed826d171411b6bc7b11b496f545ef",
"0x144d18679fb2f77adb91c43b776ae0cee62a0b04",
"0x9435360ce8a05bf5c36c840bf6cf7f727d02e69c",
"0x81c58302ef10f692b05197cd4622d3037c345a03",
"0x0027b7b99b712b61d4e2c607c39dd56e467094fe",
"0x991BF66C420BbfaF9de1D928dbFcf240bCf740Af",
"0x6230ac8fe3d54dc4eb58d30a834000a2ac25a0b3",
"0x6ef2f8d260ee634e1176782006127230e841ea64",
"0x8bf71b4ffec9bd7557f9f12fc04ba62a9cb0e766",
"0xdbeb156f3130adc28e171a9f2c3ee8280399effb",
"0x24172f2b1a6c2d6407ed0348e10d7761ec0962dd",
"0x0e003cbd2bd31c5067676b014ae0c65e97099b81",
"0x1fd093bc581a29c44e297b23b9d2ff3a58918d4d",
"0x8d98627d52f94bc27c56ed20271e91716fc6d162",
"0x1886fe970e338a710df7976b12b3591e0c374114",
"0xfdc3d5e2cf84ec57690fa819972c9307e85cd06e",
"0x722e4beb35e12539f9a8065292bb3bba77a9987a",
"0x55b43b691f6465dfa707e9d9860cfd9951aa456c",
"0x384fb2bf2182a8df09b66732b7bae9f8c92ba399",
"0x7f77aada7c98334ec41e7694c81761346f9fe7f2",
"0x86339a63b82a4fb5e1ea888eea7c760b9662f1c2",
"0x225b97007ea7a267b6c821b27632f3143407485c",
"0x1cfc2aa94ce44fcf5804e257745eb15c61bf2c6a",
"0xc12774cd85e7d1919e436178299ff342a306a9e1",
"0x48c7bf7650111f11447a32e1087ad0fb250434a2",
"0x607a2b222a3593a8dad86d07d92420938c2b03a4",
"0x107f809d45fc3fb248edd472d5567b381a468bbf",
"0x1d8bb512f56451ddef820d6fe0faa0b1b655af07",
"0x6ed36b0c1b256093a68cb85b6ac046931f8a58a9",
"0x2fb7bef00c58a4f7d7bf3d4ee0009d84b4a886a1",
"0x1a0f6a08eeea5891d2e63cbb4503ff9d7e88fbea",
"0x5e7794141088d49f95b11e0d96527d639e66392e",
"0xd2ece7d6f0f2629f1b2c4328a62ca25da8232801",
"0x8e6c4b5cacb3255530a32cf15203a440a1918ea7",
"0x96cb84ac416602cec04b6778fa3f8e588e84cc95",
"0x54737c2d489f6f2482a0c83d177224109f57228d",
"0x151cedf802c43bf45bcabb9de084d4cd90b6c07b",
"0x3e1fd789d0e7dd2f4e2c6f779f64376490b9ceac",
"0xd6b2631aae958bb91d9d3002a462e15d9b32fed5",
"0xa6406b8993e7f48f99eeba2948a2ea06918bc7ae",
"0xfb150cc9f95b900b7d947d5f7b6fc8adb0f8fa0c",
"0x5b170346777ac7a0bb20cc85c17d4ada144309e0",
"0x29802fc3812f15f6292bc7be4317645de95aa4fb",
"0x96f896dc6121f52fdf74ce1d56c89cbdfe0bf4a6",
"0x87fe8994f53910da1c8e7da9366c484bdda9ec13",
"0x9fec9c3b627bd340b7212a624c5cb4207543d5b1",
"0xd0e466f75e407eee4999cae024e127354470239e",
"0x09f085c87d7f2f811915169901b9b209d0c3d496",
"0x51dc4aaf1d6ae56ba5cc03bc4bb5010fab11341a",
"0x5f62dbf9422dcbb460258b4109b5dbe2071855da",
"0x06fd644aa2e5d6480970fc6e5abdb4b6148da93c",
"0xcb58dc38b09c85397ca201065f98e10c51f584c6",
"0x4f307c9d180cad9712aadbeddb4c7bee031c2b13",
"0x6ca1c0b49cfb3737b6561bf97ed834971da3307e",
"0x549e7d17bace6aca065b3b308c1dbeba44e05b56",
"0x96781248a3c8a31c6e81ba3d7d7b87907781f1ad",
"0x530ef0ff647815a05b0b13c9c8ce6405199d6a70",
"0x162255d8a1965d8ff3c4fed22f7fe3fe1530e606",
"0xe4ecf899e212f348d4544ea7e7c0bf6dc528fb84",
"0x7b6c8e85cc18f65b655917b09b007be8e801ce02",
"0x6d0e90368732290051882367aa23fa04e4644c6a",
"0x61f41659f6316f2cfe9e6200e00b19c2bb5722bc",
"0x50feb4acd08729e5e25b19409abceeb32c7c07ae",
"0x09f7f588a6116959638257218abd2e98f8991872",
"0xada7d9629e09e192e7784eda0b2ee2079deaffe3",
"0x896ae45164b0eb741074a1cdb3df170f5ed8f664",
"0xfdaeaf7e23a4e4d9c79d89b1f940252a72d93743",
"0x460f850f2610c62997f63012623dbe5c13c0107e",
"0xcd605a63542017821b30874768f5aaab7132d97d",
"0x51764790b30b49358a3b2e6f30ad77484b885b90",
"0xfdd141f77c198476c80abcd9890ca8a3ef163602",
"0xa6775fd1898be2ff33f6f84c3288bad03f06edbd",
"0xf31dd477136fcc69da9d17276f00c378eace18cd",
"0x8f89ddca1a50281743a0b860ac5d29b99a59b93a",
"0x87c89f5f027b0dc4626e92d92e5964ff8661df84",
"0x6e073624229af21ba225ffe4092eadf007949435",
"0xa354d7bf4d121260c4b252fe61f64eddf3f8cae7",
"0x184aa86ea6abc983df22693cbd63e422fa95af79",
"0x7fb3936f0706677a538005af331734cc4ff78122",
"0x6ab72bff457dc3c74ba661e550e85a2e89f405c2",
"0xa2c664db0af3dd6cb17b8a66d1d2559a7fcc5987",
"0x9fa3c87eb4668984b87e185b24ae08759b0f50bd",
"0xac35ddfbdaeb568d165c2f78fed58f4bed734eab",
"0xb98296c9b2d75c6c358cc9367acb4ff433f0a742",
"0x981d5a98ef923fff723698a863ff99abb5a15ac5",
"0x07c70120e3141e3145f5ed1b327584dd0c773d4c",
"0x2190b570e96ebdb6c15ad7c4fb23b4d1e48bdff8",
"0x0b4530113bcdab0bfe0216b50e0e114f8d0542e5",
"0xaf7d745e2e33617a228fca7d0bcd5d6beb20fccc",
"0x0dbc12b0c547c50db2d99d88db1302bd071838ea",
"0x8508abfe21f6244e958d82cbdf498bdbfcc6fa63",
"0xd112071a5837ac1f69e40fac7a25caaa9baafbcd",
"0x57620f3cd22070cb6759b2fc1ae00775d187d942",
"0x8ebeb674e15459f4ea73eac42bfb0486e330d283",
"0x4882cdecdd1fd12378429d7f0060a74220a88662",
"0x0fa3a9213de453e9d9bbfeef6f6d5e68a5894499",
"0x4c3198ae8b3dad860750a908e3a59b72b606f6bd",
"0xcb96b5101b466dd384e663dc89689a575df359ee",
"0x5f2ebd6db31908ec48bac2f5da5a0487e3ca9b97",
"0xaee8646bd065f95d6fc848228db07980701c8e8b",
"0x1f82fd59071aa58e03800bd586e6d2f9cd5fe325",
"0x9005d755c216fd3694ce003c7ac022191afc71ad",
"0x8b3b9c8f06eb555c6ca5d33094c62041d2da1dfa",
"0x6c42c30c87081a53abbfcd1d6adfc4816a371f30",
"0xfb27cb7844313db4beafd0bed12b5f280bb3f054",
"0x4ff3659f2023856bf48cd0a6ca4ceffa7491a988",
"0xcd675a40c4ffb16bce9f65910a9b81ff1d417eb4",
"0x14ba3e6b5a3abe6a778297434dbe45f0c47e12c7",
"0xf88b16a0c9049d6ff84634e5513a7e9c703334e7",
"0x07900803b43543eb4f5fafb899c9d007c9a88de5",
"0x4167b32bb11907f400d510bf590aac413c9195a0",
"0x3be2585e4408848eda54a57a0ea8f20a075b56c2",
"0xbfcf482d4600194d42916256205ee9be06780105",
"0xe67b575571a89efb12909c7494c0469705256fa5",
"0xb1576bb5bbd9eb00e8ff9d82fa9fe114ddb172ef",
"0x4fff408ed3ecf747d999f87be8f567c376c0103e",
"0x187e13a2477b5ce835dc0355f2629824a94538dd",
"0x95eca88989948cf0273e97c208ed430490ca17b6",
"0x94e94bcc8f0b9d66c499516f0f440750e5b0fbd9",
"0x665ed9eb8174e0828a41f6e23c63fd586b9c617b",
"0x5e90726d809fdace50573180090760db78b87ed4",
"0xc4726cdb6592693627b30493a48231bbf67bdb3e",
"0xf9c909deb9cd08dd31819fcf30001d8cb2e5da27",
"0x05fb43f0028b1b57bb9cfe2df76b26175d08b0fc",
"0x56b1a217b683fabe91407b929dc8662dacd5d050",
"0x2504e3622346cd2ece5850e35fbc755dd2f8f2a5",
"0x53bca1206d639c71a9443b9fef5344bc01400de6",
"0xa83c79c932cb02f1a88f3d3ea2a3d87f4de0b51f",
"0x27918e02e98ca1ce08e061eabd6ce3c107c1fbf7",
"0x669964af58ed1ff84f3b7b794ae113e2c952bfa3",
"0x088b59e2b3eb9175c876117df2641129c9ee9fe3",
"0x56689c0203157ce63ecb3c67a5ba298aeeb44098",
"0x0479a1285f699ca0bc21b43f540ca45eda63a9bf",
"0x3630b65815634f7cd92e79e21b1914c8fe65138f",
"0x2f50397dacb1d7524459e77c5b559965ca10d846",
"0xab2ab1f3bb0f4ff833c2a589bfb45484f6920c52",
"0x3adf414410b4f1b729bf01187b1a29dfd6e9bef0",
"0x3cfe2e03954c65d9f6db6977e0c0543ed97db8a7",
"0x8063ae13943c27bce1bf215f5bcf2056375e728c",
"0x333c4b621f79bdfed3a57fd9e9d69cc20678a31c",
"0x4805016932aa0C422c4c0EafD27c9363371a57A9",
"0x0a3aafaa3a03cce4c32970904e7bf3b48c47a144",
"0xca15234927ab6ecf9234b7fef8df8418476db843",
"0xcde33024ae8cea42d5fa25735fd64ef8bd274742",
"0x8f02512e87b7fcb421676cfd9fbb8bd54214d734",
"0x9cae126cd3f826d8caafd4731cb718fe27e01ca2",
"0xf3b46ccc690b589ce4e544ef3bc4e8602fac2312",
"0x702cbad0f319d5a6f3b21f998c416f024717a9ba",
"0xa50f901a43865e3f467cb874ca28b75b8884f18d",
"0xaf94c84dd8addbc22565c0cd5abe232e99b97c72",
"0x2c006c818c627997ff2b26cd938948642be53cf8",
"0x9d8c44d7ca9f8ec7997aa5dfe970d5eaa0db0213",
"0x21a6bf9857a8874b34ec148969e29c70c3d2130b",
"0xa8090f22fbf2319acdbc079b75b7e54686e0d054",
"0x8e3325f9573c9af44fd1a523cca0e914af87a6f3",
"0x70b88b5b66b260cf01aaa72bbbcd9c13a6b6c0eb",
"0xb9112fbcfcf093e5cd6617b9b8275c2a7046a4a3",
"0xa9bbe4609d81b8b43960f4c4ac2ade7de51db8a4",
"0x53981dd404485ab91b52ad9cf17ae6f276413e75",
"0x47d55dd42fadd3d0850954a48586026b0141b8e0",
"0xa120ad203c1f5c7854012a93b216f83e6aa3437c",
"0xb56e077b308778e765113da0435625df7f7e1dee",
"0xbe39c2f274268e77085abb3f6c669cae0f87e352",
"0x76c8ad543fd578528e376d66dee5e0055dbb8336",
"0xf52b81ab225102740b7c013c8cb3a579bc2bcbe2",
"0xd8ed5d1c2a2efaec279b4e827ae2133cc97a63d8",
"0xa55b90ce9ca1874aaffb9adc2ccc4a6e9b9d642f",
"0x545e7603602606f6ade9f1ccb24ea01eaac7e6bb",
"0x5c4561684f2e1fa3dd3c4f427c5c4f70bb1d505d",
"0x166580f9f70928f49e312dc11c12d014f66583dd",
"0x48244a652355bdb4aef383f8d73dbeae5a4266f1",
"0xaadda5369fb4c5acb715e674dceec5af6c5ef39e",
"0x414b3e852328b4418d095b0cfa273b077c38b806",
"0xf5d3dca1d4cc5f21f8df1a96d7b852f7c61ab435",
"0x50241feb3b9d0ea53629c4055636ab5a86a51a07",
"0x90abcf804af98d41ca7c3ef8db66a5fbb7e00b3e",
"0x70571d0b9365b9a01d493f5da90bdfbeac174ca2",
"0xcb9e89f7c104befdddbad40fdc3663904de92112",
"0xb19b607d5fc4ac3266d47e0ca980ba9095ef0883",
"0x549418604d15df787eb24ca47f1f02fcf1600a52",
"0xd4e453677a089d6463b6359880b305d66d3f59c3",
"0x91931a3c54a534b1f107c9e418dd766cfdc08d04",
"0x252375fccf631ccf9012a7c60acd6d6d37c4a02c",
"0xbca73160d72fe93879c01f33836a8bb4fd68232d",
"0xbd1e75f2087aad701f8bde85771897e4d08a46e3",
"0x588380fb662a4200d4556eca21599e6a29cfb585",
"0x873f3bf6dba40a4b1a0b8041b528d149d23b5308",
"0x2af26d9aa7183f90e1cca1a3e6b9b55d2a1893ca",
"0x302a64089ada835e59af1f17c54497380a3511b1",
"0x64811c0887951668324da17886a98a55cc5cd195",
"0x1dad34748ee00b49642cb974ed717ae8687a3bc2",
"0x0080c6db0eb694bcb00dd46220834adbe7f83189",
"0xa54e4bba03e0c2f89e689515ff208e0c758c78ac",
"0x61ec9e277c742e4f636d2d5b26f13325d3b3748d",
"0x07136968b5ff40d05d5b885f7be19c4c8a6ef55d",
"0x005ff96c67b622ee16598fdb7e2326c074a21836",
"0xd71cddc3493dab256f048fb0fda5cf4133e8f42e",
"0x4e5beb635f83202f1d04cb6e36c39d4b779e2332",
"0xc0986d68e483376291922a5aa3a5a8cd8928e523",
"0x6123c96df7f6c34bd0a8451a38e2555b277439d3",
"0x1ca8acfd5cab11bc0316d93a228dadc9ccef28d7",
"0x6a036beff41974905a525bdf032c170de99c492f",
"0xeaeaf81a78e36c8b7c8575dcfe9ae6b8ffcb6570",
"0x9cbe1cc0684200c1dac6d35e84101d7b2e3675f0",
"0x84ab11a5237973e4131b16b4d9882e57446bb0e7",
"0xce2e67709418b452d8fcd36a502af27bde7d4d56",
"0x0f17a241b1a9cf977ba0f6963277513f746484a2",
"0xd0a17cfdd5f474adf181b0bb3e906f27bca2cb40",
"0x46edcfa49bbf3e3173c02a077937c9df4d48172e",
"0x85df49b8ec637d8ed97c302c0f998bc81e0d6a18",
"0xa2a90fb229e8da639d6601aa0f4205389c2d6c09",
"0x8db0269cdc93283d10ce230c2bea46636d4e399b",
"0xa847808c45978062a09dfba1cd0d61cef021800e",
"0x17197adb4f5a20a9ac0638c09070d0b8b73670d1",
"0x0883841bae76bf8ac1ecd5c8502ca9a7253d8edb",
"0xd2969F1D3713cb38445316EcbD85e88bB9029690",
"0xf9e82c3500e1fd227416887dec4d9fdd002a2096",
"0xc457ac7de3170d476e74d9c9a1a116555138420f",
"0x2f1d71d05a2fd7f8236c19009c82029779255a93",
"0x567fdfa5c177987b9bab22e9eae42ce7ac788816",
"0x3e5d041b1acb6d95230423e5ea62a206c8e4f550",
"0x9615dcdb185a400c03bbfd45a011d6d1ef030579",
"0x9d4f256347ba7da92171ea2ba19d74d9d4cb605f",
"0x6b7ae8c985852a1ca666e62baa820baba766ebcb",
"0x4b05acac956f2f8df8b8703d6cb0e35be97dac0d",
"0xf937e59d127f0c6cfb1d0d2d2033506019f01505",
"0xc9d8e0dde004a0f7a0bb8b11116dffb10e00e92d",
"0xdcd0036a55c818dd75c58ca68aecd4d6f02c9cd3",
"0xa5cea650c52ac0ecdedbf87123d4225637f56a7b",
"0x6271e9956919be35b220c6a9901349824c5a0caa",
"0xc2fc15f798a2e4486a48260439d78e6dc048a6fc",
"0xd56a06db3babaee61f95188693fd92be9b453d76",
"0x5ec3722c36254aa316d93ee525d8988a5ac560f0",
"0xc682f61d019796f04a745d3e7fac99c1f32b8fa8",
"0x84daeba10c8864a46dc051876c6d50e944ae9943",
"0xc1a8e970106de776841f8792458cc69f4122b216",
"0xee4825474555ffa5d312f22873159cbc400330f2",
"0x75773c1388cae918ef7d7704205ae6f1cf0216b6",
"0x80b90025ebd329aae7f272c40a20d7ca0dd8ff28",
"0xa05646ceb6fa9e9fc9e7a50dca8a8684dffcc1d8",
"0xf421d973dee1e7924446a8c7fbac2a86fb745cb7",
"0xf92ec52d7c062a193db14f27f6b96e0cc59f7cfb",
"0x746849550373b814dfd93d8fc2a9d37cbc226bb8",
"0x84027596ab00b9d19390b015824faf7850b4137a",
"0x3204a9b1395adf7f82e9d5ffe9dbe274997bc74a",
"0x6febf08ee1430c6bbd8f8742f456b6f77547d5f6",
"0x08eb577cd1a6d1369a27dbff3d01128426c85ceb",
"0xf3f04ce29efb3c36d46e7ba3c174ab46a35483f2",
"0xc745fd0d446be84b83ef83d07cdf77924db9e3af",
"0x64f0b7084f6dc1e530ded2f2db70750fb971ec4d",
"0xc22d8dffeed9894e8c310200b7086b1cb554d600",
"0x930b383593a1758d73eee512527a3fa47886a506",
"0xf541b0cf249bbfa5f8b967f1e59363bd1d6575e7",
"0x70a33d750987ef34631e04ce5c17a687e5d87ee3",
"0x96232d041648046c17f428b3d7b5b8363944188b",
"0x91b2c325afeadbf2a611d386b42a43f78ab52141",
"0xeb3702348f0638efb11cfc4a9af396e8db560027",
"0x099af32b55a6f050f5852d2034cec92172f3f5ba",
"0x0e77a05dfd4c261a4342bd9a91351ae2bfe597c3",
"0x8a0eb14af4336da0fef456a04d424bbbfb9f77df",
"0x8ba7e34be3e5601c14ac5b75bec2b24cb1bd37a5",
"0xba6f5dcd2924dc9fa6134c10ff75daa09c579dd6",
"0x8a5b204e1f744645efeea4614bc64bbf91d85629",
"0x98319863e839af6654caace9f296608ed1f1ad5d",
"0xea1b056043bb0b03451f40ef0ae8566409952284",
"0x8c96949b8ad1b4890324e7bcbf5c0e147635e666",
"0xcdc12396c0f7811f807e73ea5cf1a8da1fcf8c6f",
"0x51e4ee1acca1e1242f85ac8dbd5011b2faa13811",
"0x6e89216b6d5c8fbed5cdb21b7838b801b9a9ca52",
"0xa9d68ddd7e441219412ab5bada1e24b3e3fb26e6",
"0x7c5e299469f282b8c6d03c1c97171077d245c6bd",
"0x2B72EA1BfB59fDf13A0659Bc728EfD3b0EB438e6",
"0xfe8d0058f84512673d998a0159efbc5a6383041c",
"0x109c75fc0e264b4afe46ac9e9dd3d72cfbdaaa43",
"0x788286cb76164e783cbc2f3882b629797f34e148",
"0x373fc2d830b2fcf7731f42ab9d0d89e552da6ccb",
"0xb64320ce6ca2241c5298d269396c700102597c94",
"0x35f546854758fd420e47d906f8bb7e51e0a60177",
"0x54b9df921a79342830729b6b14dfe96b02e2aede",
"0x302a91f51a0a01769394a6a6ce37ccc7ea16890e",
"0x3Ea5C5FBB1BbB1bd14f6e0B6416AEdfea3D43be3",
"0xca4ddb84eceb805e39d7a1d0912e37765f0dc2e0",
"0x7145b0c22fb0a540c9410ca4c90b66c3268bdbf5",
"0x2cd4108ade226e30ee0c1a0f3fad133204e6b810",
"0xed3f2c8e4120641b26fbede9c97eb863b631ae94",
"0x3edc9a6fe9a1b985573928e4bb74ec080722ba02",
"0x074af7f2a498a5de6614af375ba3be7c4e43247c",
"0x05843444c9aa87d902f6eed9e2b4fd666df75a9d",
"0x8d7aa8f5bbede5179e01b75a59119a8133571e97",
"0x9e5f752a4b9de8bcddb88073bc6fe6363c4ae471",
"0x52167f58d753c267b5ae0f712e837479e705f963",
"0x8cf73fac67b6cc66e2ed923e87118df3b3337101",
"0x2c0e7eb821597b8ca070780b609fd8766bbcf3bf",
"0x448bf0b91ef5957ed36b4ec9bc6f653357637231",
"0xaca050ad38d248fb27a05b82020b573c2cf683cf",
"0x953bbd4240b2a904c87b7e06f1344b8129f990f9",
"0x651397ca009cbc96fb913050bb69410769df82e2",
"0xf8d20e3b3f5ad2a35281c74724f146455ca24e91",
"0x000d8488a83c183b16de6ada1c0fce38d4b6b1fc",
"0x14c9cce7211335687b881bc26e49f113229f11da",
"0x41891ae9794918485773bc8e9061cf4da1da81dd",
"0x4b39338bd93c5a1db7257edc01aca101fba28a25",
"0x4d32ddab7b8c23cb3a2a2101562eb32efddcff9a",
"0x7a9e49dacfb35977762b9259df1dc8880471f898",
"0x40d5fe53ae73b98b8d35d582c6b0e01c38823b3e",
"0x314a353cf021b8c0724cfbf8b4aebbe90ebdd4f2",
"0xd7481c1db27c7394796f074be59da1e918deed2f",
"0xda3ff115faab8467f4cb480433a3b473e3747402",
"0xe1702746f92414354575b3b5d3c75f598e728c38",
"0x357926ad886c50570bdd64f826f3188e289bc9d1",
"0x48330f7d9fafefa35e99695bccec84bef80de386",
"0xc2b2568982707e9691dce7bb23501071bc06f415",
"0xa86b4c18590a6768fbee4bb1787361622b3f6ed7",
"0x924d6ab57fabb9200fa4607c6abfd6178cfb1af0",
"0x03f220b08d9911bb76d3d218459c92fe573707b4",
"0x46067008110f9458dee6d4394d8df26a10dd5a6f",
"0x468980949313955d3accd08a47e906f722dfc804",
"0x6e825f0efddaa6e17f6451c881e7a992587f9ba4",
"0x9d16c49a5d9a8bebc09c12d0357996b72f5c5b22",
"0x6bc16d0d1fffce493a9fd0d9a7d429a018c2c22f",
"0x3a13646cf7fac5a566d76b048ded85bab2f1e075",
"0xef3984bf2de454fb7c7abb810f6900b51b5d2ed1",
"0x386f8ea608c9012a6b7d19934b7bc61b27bcd985",
"0x3cc377fc0041c1b8daa053846f9c814370cf77f6",
"0xaced3eeab912c898455c4a7e4697b21c3e943601",
"0x4348ce8af5d10fb79e44818f5110e9a648aa8099",
"0x178e1ff51d07fc512b908d9f8e50dd61df666666",
"0xd7a91810541b6cde677c86ff18f5f3f659ec886f",
"0x9e3d381facb08625952750561d2c350cff48dc62",
"0xca0a1c95b69132fd02086ec55caf8112d7877e22",
"0xf8dfd987b9cdc2f213cd9a30e3af3c190190ab17",
"0x08f2321226147c55070876e97765afb55c730ba4",
"0x8f2f2b488feb8e45456a703390aa0e1877329b10",
"0xded93b08e0580c539fd8494fbeb7697b134d7c23",
"0x9675b119c6907a1d17b4ad9ec14f03d3c4435635",
"0x500a98f0501d5ec3535d0161358468a4c423cdff",
"0x2fe3664a0eeda891a3192d0b791d46b4989d8e41",
"0x2f4cbba4a51540b84c88c469625962e4d52dbe3c",
"0x017ffb7c9e5aff47d9569265d7c78b2494099782",
"0x049e5d0434ffe1d6ef33fa33a94219f4e0f26135",
"0x488aa9c4be0770612efb9feb942114a95d8a0a5f",
"0x90325dc16afa2c06cca4d926017c6c5914477604",
"0xb62ba52124f3022acaef88e458688bbb568f4bde",
"0xfc08dbb6f1134fca0780c41b5ebf1af5fcedf1cb",
"0x70e60030afe6b0a958e34931dfceb73e80ea5828",
"0x85a4427f025200b70dd929e55b1dd889e17715fd",
"0x0246b7dd4c30205892b6009143ac8fb91b6924aa",
"0x2d632ce92f7d2b2d061945cadb7f92fa4bef79e4",
"0xee27c989b7e18dcc47dad2ca9f53db215037dd49",
"0x67362097548aff2552a5611b969e1c772a2547b8",
"0x5578deb537c3b6553fea722b8513cfa634cb73a4",
"0xf7ad1c0be516a467309937afcbe43003566f1350",
"0x47c88b005e3a51ae121acd6d2dc702e0de1484a9",
"0x8184368368f6544b243727c1fae2e7ba51eb3d4b",
"0xe24a157fc29799a7e3417d27fee4da1f028d132b",
"0x19cbadeb83882fab1c533700f2f2fc141260199d",
"0xe304134dd7e2f0e30fd38432fc2a6041b66f4b8d",
"0x026416fcff5882b662c616e31b836d521f8dcade",
"0xe3c0a4713aaa42e6bc8c14e4f243e4d5a6c25762",
"0xd7191ebf1d8efd4a660f07a1fb735f3d9f1a0bef",
"0xfa7c72e3a3fd54f26becaaf8f1d0d8815f29570d",
"0x08bd61a0ec527d81b4746740f324c8de6a0b4826",
"0x78b63080950d8ed760641738b5902f83b6a483e7",
"0x4262ab521983c6cbc51bcd08672ae92769535396",
"0x1674d6af75afd9f18d0fc3a82d668514e044ee13",
"0xc0c90ef1002264da891989c4080fed9de975ee51",
"0xdedfb5ffbadb30b6d3cf28d90df8c550a35da3d2",
"0xefdd8a2d102b5645537e86e1624dfb06ac2c690b",
"0x711466510531a4cab455ef7e9eff5ed2e6105067",
"0x1e47d2d5be4719701e4bd8319591c3f809806319",
"0x76d3238fb461768cb13dc78951663dab60136d96",
"0x7a599a42e9aadd406b155049133bfa9eaca4a006",
"0x45e351cc1e6c28e16e74c8ade53149bd5368c772",
"0x020ec7c641d24db122f5b7024fdb5f5cbd17f5a4",
"0xd5ea6da94a71b52247287dbd985ee3affee40ae5",
"0x6798b8243a75ec18e402d9fac64d30953854dd3b",
"0xff5d98c2a2eb2f27da61566c22c4c64639e1ab0b",
"0xcea47bdedd02423e4bbf466703b2ef4ed77856cd",
"0xfd63d9503e4f0d538b48c163c224d93e0cc9537c",
"0x930ca80ec91fd85e324a0ffaf31872b97679cf36",
"0x5d3767cbb9fcfc15f0614d3c117a50fbe12bc021",
"0xac0868bbf283bf2a50ce1784496530277cb1f28f",
"0xc424c67ab3a5a2d33ae5d234a7fd2c9ed55f807d",
"0xf175384baa9cf1e98940fa272eb6923edcb29330",
"0x5667ad7a102f81fca1afc1d6b36852aff1cfb3ec",
"0x863b608ff42e2090e41d327bcd58557b8b023a18",
"0x171e4ba340e485536e6426db095ad78b63f9e137",
"0x9600c5e8126ee2b82bb037b666df85db5a91a036",
"0x124bcf206f1581c1d2d2a86310470825c8e65bec",
"0x6185b474e0b955814a2eaec8b5051b3e3447a0e6",
"0x63ff74d18ee21b07362d076cba941e15003293ca",
"0x25469dffe6d0d88819d089c218ca21d15154ad6f",
"0x4362c84fb7044ba52d3860f43ad6e10d810b4650",
"0x5d4207c8a59756dc23d99ac42ceff0e2dfef4064",
"0x1b810d1e48c5efc81ea4341d2c1ffede2e5bdaa3",
"0x154af82a1532f0bedb08cf95fe4e172b0e0b9c46",
"0xe4b7373f030d87ef9e60ee07e54dc830411eac93",
"0xebc39778c3516097c10708f418697f7390b323e8",
"0x74d463a40356aff57bb2c1c9be23a52e275b9fe2",
"0xda44d8268c23fb4dc36fb8f20a43115c79c5c79e",
"0x4d9b64e9c855a250875e253a2cd52892529ff83c",
"0xfa1bec96d2f6be05645e68df0ba98f1b089865c1",
"0xf714686c9317b47e369b2b0fb4bbf519d2ee1e04",
"0xf367236d56338ac780267ac09217b02746607cae",
"0xde2c9513d7cd6c48ece6b8ca79e835d3f18d4931",
"0x4211f627b3f7cbedf98a8328f949ea3748c954ff",
"0x5d50a1ab1488479f0556c94daf52e43aaa0eb892",
"0xb7725a31fb93dfb139d6c0d40e17b226ca0a8800",
"0xf6db14a86563b3d5c277dfd53da07680db7ef14b",
"0xc777fcfdee6f04605a8c7afb7a2ad75a0daaf948",
"0x66eE17D0e530fA9DEC4EEDB2DDD92FC3fcb1528f",
"0x4a226dace414934aa6297fec635478255fffbc7a",
"0x742191cb70ede8688c852e471a290c683e22e569",
"0xff93657559e3906fd7524c5fba62ead17a5d685f",
"0x2d1f067077c36ba262e72a73a15386b418adb5bf",
"0x1b9cadfcc98a52904fda06dcf121ef3e2c61030e",
"0xb7b3a3965ae46cbc437e1e2d283e8edea636408c",
"0xe0957889344a1bdb27fd40d89769a5df1e423ebd",
"0x557f00fecc4cc9f5b009261c69aedbab9a728f86",
"0x3d673b421109fc4d1624a6157f2dff32ba8130de",
"0x3d6e3b328dfbf5f93cdc3fee0f65c2210621e50a",
"0x3f108c4793fcca959ec48cb9f5a966f5b85529b3",
"0x7b925718b62ecb43d96671066e46b3351439f144",
"0xd38df83144deef7de37ec7d8927842044e21ea7b",
"0x6564524ece44d6edf0dda5f3a856cb6b886e78b7",
"0x6c83edb9b22c9cfee1fda464fa7324e38129d69c",
"0x9156e8522907023315ac54d8c4f43da86e8a0951",
"0xa9df6d6b5cd32ff272d6c25c98e6ff8bd3ff4b4e",
"0xde0273b696938ef0ec388a465144cde10f91da0c",
"0x1636996d11b69e3193ca5112508d8daefe43d4da",
"0xc56441bcd88149b9aa2a0a90362c422798270fc0",
"0x0f8395da6ad500aef8d59ab925d0157b1d03c0b9",
"0x5fa2eca8bbeb321ab87a0d291f4c4d28427b2580",
"0x2e51ec323143d685a8d40a9cf509c478d4b4c431",
"0x69cd0db0da01ce346d5b6c75b7742a8754947798",
"0x09df4be37cbe1f52064028dd14f6036d435df264",
"0x17290686f36c1961f0f11af53943ccdb2ca63e35",
"0x92fc44d5d047b2bd9bde37832252d4155f5f0381",
"0xa72aff9c67181d0ace646c9a97a6ea00918f15ea",
"0xd52bd683a5ad6fa441aa04165000651df1ff23d4",
"0x4d3eecd10b597bbad638a423ea0420432c401151",
"0x77c29c283e92b805b5aed6e3f276fc7de3fbe384",
"0x4e12c74182ac1253c41e74d62b6184d7ce5524d1",
"0x0dc87f37acb9e6653991fd365cd92c142d07d43a",
"0x3f3ac45b916821af2106fb3fb04db3aa12c59061",
"0x4cce8fa1234835f92655f753a27d5026ca59693b",
"0x2c6c9464f98350a7681a61204a37eb830312138b",
"0x1c4acd05f8518f8c74e2eafd7beccf8eebd7d321",
"0x617F5D3acB0dB27f0d3d670c15b535d184188c6D",
"0x76df767ba7576eca390b80804e2d3fedece7c3a9",
"0x550b64f5f944e9473f21c3b57a74bbf804e37f02",
"0x302bb37570861d1e519c4d383d988cb6bdfd6a1a",
"0x3902e1ad1f0b69898faa557d659a34d7ccc014fd",
"0x9369a69b1a1b461eaaa6747535c4e9e1594ed059",
"0x1e9703bb8846869faed61a879ac65735d3d6a4f2",
"0xd3104b659135eeb28f3b5069dcc2338e9da6bb04",
"0xc88e45079edf86afafe578c24647e1b50d57a898",
"0x37788fea3a0f34e26950c9e5c03263358ff51710",
"0x73a5d60a70eb50417cbf2965119131997ebdd874",
"0x48db932bc20a1b22c1cee2b38dacde145aa49a3d",
"0x140b5cff20f7717b20148467af18df87af3c920a",
"0x6ce54ef5ee66e18d6043e58bb1058ff83cf6131a",
"0xe161a0565f4e8365792d76045872c07a93ac8038",
"0x45a3eb3ef584de81b6dcb38178be00d5b01b848f",
"0x8110e5c8581aa0fda6f7f1e5ef8dfb0337e5c7bc",
"0xc69e3df4b9846b16ff40e9f0a1b17e858d6f78ad",
"0x69e30eeae2e01b13b24b9971aca2ec2257c0a6d1",
"0xc13d5f13e7edc6fb74679c3c4ed2cbc172fa2afe",
"0x82b611f90ef96d5fca778b101c530401a77dfd46",
"0x8def36ba09af68cec83f89de7a16a6300fd2074d",
"0xdbdcf7f3a925e5337aca732b4681114b98c9ef37",
"0xdb84b5b37d9aa1048d45c1901bb7ab14fbd615db",
"0x97c2c64d02bfa89f5af2db5391b6c1a25595e692",
"0x65fff667a15fa77e27ba346274bf40b048e5133d",
"0x99bfb0d876ab1dafd6d0a2b7c25e3e86ffaad4df",
"0x6ccf36e10ac03a4881458edbd8684c38723ef623",
"0xa55c783bc6d59e4e597aa07fa26289aff86af795",
"0x02e28b4e2eba9db89b9a7c9072a8dd9b1dc5c9b2",
"0x81200f6b68bb7822466b4668a796b855fa284bc7",
"0x649bbc14a6ec9517c9359154eaec570d84339b47",
"0xca6589000a94c1322a3c6377e4f212147f76fd45",
"0x24245e6c515187ab9b103bd278dad0d5a08edbaa",
"0x0ebbfc8d21809fda013520670b51ba7dfd440fb7",
"0x2b657f8e78b4b8ce501f1aeaedc4477ed4c9a844",
"0xb6dd1e79afb48fa3bc4734c01687c56ac73ee2d4",
"0xa106460e9d4390c184cdfe1616a8cec750db0644",
"0xb5876d83605ab7220d68fff82e61acd55d2b84f5",
"0x6a339ef2ceeced597f43216b2a439e2b12aa409f",
"0x7ed571288974e722e8cb5b3b200c26cb43be0e20",
"0xC05aC9D1C66b885bB41E3DEF65F3b26a29CDb609",
"0x5496234d3ae155a65f584f16f3af543e4c944ac6",
"0xC689146Bf54B3755d4dE5bbefE42a0Ca47A1B0A3",
"0x7e92f026a320ce667d8fae9f42517d535d3c1efd",
"0x90f925574cd9497540ab75f469cb55cf60bdab52",
"0x1f312652201d5425c24322139be39f1bbdcfac69",
"0x4ccf2f54a32aebeb92b6b1dab8f01ff41657660f",
"0xfc25e09bc98d21ba9b1980a2f435f9adbd2f9284",
"0x115cb1e82bd20b1acbd6b0728c75785112167a09",
"0x0cfc73e156c268ea0d7e84ec31e8d3987538962e",
"0xc2447164fcd983b0ed867ea88133943af9815e61",
"0x9c3196f8c884c2f7cb2bb3c769fff8d7e479cd82",
"0x5a6e53050b2c6033c7c2129c5730aa22390d2766",
"0x3c06794dd107b9a10b690a34c235291900ebd822",
"0x6b591c24ce5e4295180185fdd71cca6d3e900e11",
"0x6218cfa236ba53c830fc893cc6972308a104e50e",
"0x59df5a019b8d8f3fa4360e1a92f7827919181e56",
"0x0e90652942302bf6b9b152464ec5e5fd3bd0847a",
"0xb2a7a4984dafc2cf85aed29113d33f6831b8f8c2",
"0xaab918749e02d84ebeecb45bc4bf7dc6770c1d6e",
"0xe2945ba4126582c0548759f880d1951559513b0a",
"0xe71a9b8a30703766cb72dba1476e2fd1174722a4",
"0x3af6aae850297c52bf7d0b9e8e580927880502d5",
"0xc543b7614229aa3f1181069fbe7a97837eee6db1",
"0x49274196eb778b4fd738e689c1ca5a106b7ad903",
"0x337e95d89875d43a57484048b9283b835f74e7ae",
"0x7289C416f051A9E737f6732F318125C6B8bcae62",
"0x57462c5d0c206c48b67777b2daaad3f78d6a9c50",
"0x2570fa4b1a7f4020fb1ba803bd1b796718450f83",
"0x74d445e8d4bd779cca6a3c5487025e931e1ca546",
"0xe4d70f9d2d6691c186544416df2e8334b795c6c9",
"0x329ab87218a890839f40c2a3f9b1be56e6d9e466",
"0xaa8401b7eca0aa80c6d019320275e8178714a9d4",
"0xb04bf0f93a3752eb2afa427b2b51b7a6881f4e7e",
"0xe56ee219677388cdfa7ecaa596863f1794871af1",
"0x55b958c68Dbd7853b9B59a78aA5A6ffeD6d8A5C0",
"0x99390c2a0125decefc8f8dd786bfa3f10b2e8c6a",
"0xbf188eddff145abc9798e0443a0d9143574923ab",
"0xec1d5cfb0bf18925ab722eeebcb53dc636834e8a",
"0x5f4bc750432d6eef261da9c9441c92008fdccddf",
"0x227ba0077b11c550ffebdd23459da3ef8634be40",
"0xe8d8b73ccc85ded891ad41893ebbb0d684350e04",
"0x46647560d659793d7333d52a3644beea4cec4a41",
"0x453f18a1c0a2d8d2bcb851bfc4f8ef78ed54aa07",
"0x787ace7f98c3c083785c71586d30c394718db88a",
"0xcaca8477e84fe1509420b2e24790c5e4047bc605",
"0x99eade3113a782f8d622131697c8d20a2e9942fb",
"0x891c7dc76ad32fceb6c115020294e90feacdc59a",
"0xaba67b7faac905db5c5cda54b5901ce0ac2fb7e4",
"0x29d2174f3e8a8e33e8804f30f54a2e387d7e1c71",
"0xb19f860979e7545a93dda04e8ba4335d1e33594a",
"0xc2e83a2a14092388920b133a53b9ff2b53dd6bf1",
"0xa8a2e959bd36b1235883aa03443a4114e627d226",
"0x21eaa80afe215a8b73e1eeb714adda4a8e1329c9",
"0x8fc8ed7365d0703ae0395aaeae011c70cd844c99",
"0xd1963a2c3817cea8f618ea62272b7522ba44064b",
"0x1dcdf51535e188810b76844cf01d502d4248853d",
"0x36614e56451321831b14c9d3708596ed9336596b",
"0x71b5b8809e646d1b8dcd60db48bd8bd301be36b7",
"0xa7378112b168ebaa27d7ee9d5e79e296f91f4478",
"0x8973092419abad1a5959034510469b4bc0b4d90a",
"0xf176673c1845e4a2de387043b9e7ae858dea0cda",
"0x0a0d459090c63f889faccf2cd1f301ad71860b26",
"0x7e071a6255094675195ca4b56ee466e5c1ff9399",
"0x9cc72008321e6b7fc15b781e29b9374e037c83ad",
"0x978f304f66bdf61fdb6dbc6375cb98868c3728a8",
"0xcc279718d978056eb90eb517b1e7bfa8aa73bcbb",
"0x5ec34d71ccae9930368f5d2ece52e2fa30748ff3",
"0xd0c7c30a8f963c8ac7f837cb66b6a71602502b8a",
"0x458993aa152116b712beaf8c4477573a52d9e7fc",
"0xc9839b648d37e16cb38591aabbaed17fa10b5d44",
"0xd3d3f35c40645ca921da9938162422e9af90a9a8",
"0xf4bf15d5a0536bcc71ceaad205b878713e8dbfa4",
"0xbf443743c3843571c7a43ab80f45a24c082db9c5",
"0x261b29a97b069129bafe442cffe071c2220e193c",
"0x8027f46619bd1626d945faa46ce52d9decb93d70",
"0x01794c5ac48beb01596e4126e52bbda39d759728",
"0x2a71c223ec78f4c246d23fb85d83223ee910ba4e",
"0x466bd338061eae6a8f7a17581e0942aea11f8c8a",
"0x5a22391df530da46450de6ace8f7c28c2b11f0c3",
"0x0a566270b3659dcdba017309006b63cbd3f4f50f",
"0x3b6896ea1807c8300a4db54d48f35bc7df77d810",
"0xdfe9b34b48783d83f0961255f4007a8fa55b58eb",
"0xa2e371d33ed087f8f752d31cbd00834e735b3e1d",
"0x1e3839b307f2bb3ed5724e40429d981b01345bd1",
"0xb5169bb9170adabfea6fed6e2f62d01773bdee69",
"0x07dc7cfd43756e78189272369be479292fe0be3f",
"0x1ac38ea70347fc85cde0d49cb52dd7f2418907e0",
"0xba136d3b38a7ad5245fd5aada8b3f27aeed861db",
"0x82ce5eb885f6205cbc86140d7b9fc2f5416fe418",
"0xc7899a2205515a346debe510ce848cc66cd11ace",
"0x0ba0d3fa1a931153d5391ed2c1b54a2de02667fc",
"0x2ad98e218d5ff3db8baa2518708087615fd8bea8",
"0x54307bfeec1f1aac683f239c5b8c38a067216952",
"0x6916d06f5de30cd77fdb9ce6971a5a784586e386",
"0x8e3f0128d75727b2aae308ac75f10baea95b491e",
"0x84b447b1c50ee52c2bcd023eb371b647d7d1232a",
"0xb99fd24297fa2775e5a523812d03d6402cbff813",
"0xd70fbd66f6a22f8f66adb5652a31a723d62db7c5",
"0xa08ef996dfbf8b750d3b397b974f24dcc08e5202",
"0x53bd9b21ecb965b86c1c48a529e0255f6d1e9919",
"0x04beaaea0f84734841e9d25b29601cd2f131981b",
"0x98388ef43e07be2009793f424a4f82a1c40ac9f0",
"0xd98d839275cf356ec9e34a146c7edaaa69f29022",
"0x40b32c04c2bdae0f136737c2e03bfd7f63186630",
"0xb55d17a1e777bb1c4ea2383569cc5760166246a3",
"0x4572fbc77168e9f2f1e1d41445c658653139e7e6",
"0xcc0fe514a11bfa77f855da3d6cfc3cf91fbfabfa",
"0x903bc13fa3b9c9e5ef7d8371966f6c68f51f36d2",
"0x8864d18cb40adee9168fd64e7927e0a47e60414c",
"0xd1fad074908e2e8c081660f7f002016b440b72bc",
"0x7e7b77afcba4c24669bfd09fe3cf83019aa55724",
"0xfa92049bce2a585716ae3c472f616e3cc7241cbb",
"0x0c13e9b5f75c866c62c74110fef97a113098827c",
"0x02e97210b263713befee53057159639d4f1e4a05",
"0xef14ab5c5fa4f39131623940ee7e35a9190cd1d9",
"0xf4e23d45846c20f35760aa33570e0cd14390b5f4",
"0x5befc823926103ed5f60dff4d5ef2eac06f05a58",
"0x0d74b16ae99e1ec217451b01ce872fff6b3e1ae6",
"0x8448d1d95da38cec4aa261affa65421b63f7a2a7",
"0xc5b12ffe2b04ea62bd8ac3a29047f00a90411247",
"0xdf3e69237d45a0460d210d1a13b0f0408107c50a",
"0xfd7dcb59fd197c461591856ff2d11736561e1369",
"0x119415b515a993789f14f3870c5c93636d6c05af",
"0x82e6f7eaf4ccb0aed90ddb897797f01ea42cbdd3",
"0xe253b7dfc6239afdc5cb6721fe069b741759f389",
"0x98ff980d8954ac62601df914a6a061d60b6a0cd6",
"0x563fc0fb26e2cb1211865b29e19241ee29443ad9",
"0x6a6f34aa4405d78cc306e46a605dd5838cb9a638",
"0xeff13d3f07a9408ea8b83f94ec9a95996db2cf00",
"0x863ce55669a7fa2300b44d352232254ee588be52",
"0xa03ffe3c58feea5de78ef9ac001817a40e5aaff7",
"0x384c9fcf7f22054cc6804800564d4a647b6faf7f",
"0xb4d603946c0eca09e93cd7b5c48d7abe8f2cb298",
"0xeacb915eaf6ca13a73588fdc505ccb42c7db15b9",
"0xea8ff6de8c9c8f122de9a2759eac8469978330d4",
"0x70690aee7fedb9ab1577988a9659eaf43bcfc98d",
"0xd1c423d95e8d8aff0cbc7f2c8ffada7d9f8a74ce",
"0x08efabfa4c96a873f004dc2d083bbb0d5a5372ba",
"0x4dced5a0b5d8a8c13ed24ca1c0e94e23d73f51e6",
"0x7c6585518667fbd8267136229b93592e05a68328",
"0xc603df16f78f36a8232a38fa93acb7fdfc2cfa8f",
"0x0f459cb09185da45d8c2558c4fd6d34d5070446e",
"0xd773cb3589bc24df725bd129e0ccf4f6b13b6d4f",
"0x348df9bd14475c780a78bf48492b9a29a2032b96",
"0x77838b26e4f558adbd6d99b826d815ab3c41ec7e",
"0x2976edb01af954c9301edf847ace555141eed74a",
"0x595edc62f310d0d9a8dc8b1ae0d49a82eb01abf8",
"0x2eee0d3fb235fcccf0fab39bf53545ea204ca1b4",
"0x76d0c82d6ebc00f994e16ed8edda8ae6e206e68e",
"0xaee409188003ff9503778d4c153d15a8b2f4fffc",
"0x09af801c03215ac878fb33d82190e0126e273815",
"0xfb90e1404177288c0ad8d2b60ea5c5aa5d887d0d",
"0x7cb85ee6a587a1184e9d074fca9afc55a75b3b2f",
"0x47d5c9d754bbf5f8cfecc353f3ca4189b68c0f9f",
"0x8ec3bb0c935698f376725586562c3af45956a6d3",
"0x83d164a206df5957ae8f4bc0ad09af4943087e49",
"0x99684de2b233144e712d93c26fc7ed87a97b640e",
"0x7c5de7cec42945990c0054a1ceca4fbca6ec3dd6",
"0x5bf1210475229aad5f12d24b93ebd5f07a4e72e5",
"0x6ab9ac67e95500c566098a3cd556f67a3dc3608a",
"0x7e5fd840424d1acabe68f5f431f18ee89e6a138f",
"0xc5d85bdb97cf8c168b3d23ccfbc92f17b9da8b4e",
"0xeae54f35170520f27add981bc80e1cf284b36999",
"0x43ffc8ecb4d40d879c0756edce59c717f490229d",
"0xb0ED98D6Bc0Ce927C72865D99939010D0fFD4A67",
"0xC1a8e970106de776841F8792458cc69f4122b216",
"0x3aE23D33D5d669b20b2a1dd48264b7a650abDc09",
"0x40c9c47c1a554A4FA24BdaCDf48E902B7d204B2d",
"0x4FF3659f2023856BF48Cd0a6CA4cEfFA7491A988",
"0x50f3c833fdB82df9B0f2A06Da5A329C0f26C0455",
"0x880b2bF6Ae099e64bEADA8Cc067e2EeBDCAB01fA",
"0x6AB72bFF457dc3C74bA661e550E85a2E89F405C2",
"0xa2A534f23dC18280032ab2393B45329fBf4B3a06",
"0xf421d973DeE1E7924446a8C7fbac2a86fB745cB7",
"0xF0768489ffC630Ee459B2Fd94DE9c8fFcAD801AE",
"0x84260b3cf8fcbd0433ad0313f16eaa01df2b1ebc",
"0x90f9C75B04479560532ECfEdaE7D77e30D24303B",
"0x4805016932aa0C422c4c0EafD27c9363371a57A9",
"0xF42A14c79421F16587b698E46Bb751492d2C49cE",
"0x67362097548AFf2552A5611b969e1c772a2547B8",
"0x500A98F0501D5ec3535D0161358468a4C423cdff",
"0x1886fe970E338A710Df7976b12B3591E0C374114",
"0x8BF71b4ffEC9BD7557F9F12Fc04ba62a9CB0e766",
"0xFF93657559E3906fD7524c5FBA62EAD17a5d685F",
"0x655424538f4B7Ba3b7320eEdD48Be255cf8dA342",
"0xc488dBeABB15513a9dD5a04cf66037283BB4A589",
"0x0945BE11418b180Ec8DfE0447a9bE1c15FB1BeaD",
"0x9d4f256347ba7da92171ea2ba19d74d9d4cb605f",
"0xaee8646bd065f95d6fc848228db07980701c8e8b",
"0x2C0e7Eb821597B8cA070780B609fD8766bbCf3bf",
"0x6d9399cABFe303E6cd70F8F3d5EB99661ff992ec",
"0xB1473A84ab15A1ab6083D9E0Da16d84389fA4Ab7",
"0xaF7d745e2E33617a228FcA7D0BcD5D6BEB20fCcc",
"0xB26D1859A39c40e363E03b95426603C5d049e561",
"0x5f2ebd6db31908ec48bac2f5da5a0487e3ca9b97",
"0x81f9b92a4a89f81FB22bD71Da50A5703fb9c0b01",
"0x7b992a545c8ee9472A69179cF87700C6E622BAaa",
"0x19bF57A80144e0E2252193e818a3e3E27D71d9d9",
"0xB216522e1af74AacC83e7Bc0e59EC54D738F5Ee0",
"0xeD1b37Fcdc89970A5E7BD96c42A7BD0FD6AbdF96",
"0x1721BA87CC206Eaec114dfCB2146C09552cd8649",
"0xDc49F8DEd7565F55259509Dd5c71859A84e0f00C",
"0xF488ca8C235BCFfD67394D21ecb9c90242D79535",
"0x03f220b08D9911bB76d3d218459C92Fe573707B4",
"0x80aE49593098b90C60ccF30c6222BAf08173d44E",
"0xc1256c795373B47b413E4935Bf4eC583fb38b06e",
"0xCe8b2DB5650184545806B83dAE822b6cAd77CA4F",
"0xf4FB231Fa19DECc91b12102AC7AD4D1710D82ef4",
"0x9931cbc4587E1CA4bf73996D570031AC6944180E",
"0xAb52E51b071De669551A8B3B70C87411f95deB81",
"0x37a04ED3c1fD788AD4E7557D6EA91Ca0B5Fc1ED2",
"0xF122E70f1CF819470ae3EF4d7097C5F66fC600D4",
"0x187e13a2477B5cE835dc0355F2629824a94538DD",
"0x19a77b6D7949526dd664Aa11b28b4ac1382a80f2",
"0xB362C69Eb337C1c33eDB4F5906E04EFb9F27e158",
"0x73B5e83267170dc5853d05F751862B57Be45E286",
"0xe1aa72c90CD34d253A957937BFBF86DFb34b5646",
"0x5f7f25034f8d13Ef5465c14210e90bf214F5E0a0",
"0x285E85B82f31d4A1EF6964bBD6CF0a47f9E24e9A",
"0x2B4a706b40aF9a7F5e572e328CE7696f15e7e59F",
"0x9702A85c75dBe7f3a6c9c367c957d65C9049C0DD",
"0xC4406F35D86b183C69f4EeB538Ef00522b6a403e",
"0x6e16d42F951c3500b7f21209eB04bE3F205762f3",
"0x5eC3722c36254aA316D93Ee525D8988A5ac560f0",
"0x9b7fEb7510C2162be71991798319Fc89eeA7A1cb",
"0xD8d52F4a6Cd2e7ab540B474a4566D78F4E264c54",
"0x1883468f272fF030eFD5082F42031611FA6c2dda",
"0xa6DB9d5977De9bad6D8a8Edd0309ea883deD14A7",
"0x4A6eD099AEB1f6aE324865Adfb915060694604D7",
"0x51aAC4f5d2CbDBA2fb6bB6478A6EB3fE4CF5B419",
"0x5a6e53050b2C6033C7c2129C5730AA22390d2766",
"0x48d517b09B4a400c199B77f35e9Ed8d3f0Be0511",
"0x3aF6AAE850297C52Bf7d0b9E8E580927880502D5",
"0xc4d2dCe4eEa91Ef345e5A39b0c37DcC7d02D8AE7",
"0xa65222240dd864A1796B318a891D2F50A6F24dF5",
"0x6369C75c63e3712bEdCbB126fFcb9bf0Dce86f1E",
"0x2412F6Ef9048d6BE243188f3a6F4c4fF76B4c311",
"0xEa4c9f20217A173a675dD61771DD92F63c63dc36",
"0xD1e6c419b12A3eF308728e6fC05e3A69132aCb92",
"0x7e667fc962b769612e3f417ede449fb6b33aa660",
"0x7FE8937C8EE17f4De2cFC483DA77d05EAEC6D28C",
"0x822A2AEF1C4dA3D313096a099BfE21AFdD9997a6",
"0x8cC0a05cE7Bc61874810A39f4F04371f08375A3B",
"0xEeB38E98dEf642891848EE5412361aaAcBDF3764",
"0x2eBcc2d1b12Cf9f7ff5B4b14850F7D0bBB3e7e19",
"0xA14108d9a70233420Ca70F9BabE4f94218732a90",
"0xB3edB66aC608bC941D308ab44D40DE92Fb1ca7F6",
"0x14E5E2FDc5038a1Be22111729E933Ca83df8cA66",
"0x5482A862a1f6418731864DDaA7D6B34348BcAefb",
"0x7F92068eE383caC74E660322079B61315F802371",
"0xDF8c7feC6bd6C8A154844c1b361801b176da150E",
"0xdEAc41E1C720c32c0c811E17Dd970BB8B3727De4",
"0xBaC606bf96c1a1DE6724670F0Da80C0439C944e8",
"0x0192304EC5C5Fa8c46b6AAebE0315228b65935bc",
"0xF86f899a12fA652d29611bFab019226e2E60e9D4",
"0xd786Fae9a0BBB4BC627FBD5F108CbDBE0646367C",
"0x58C7750d0A6d1d080e7848fE4da54f69c13F884f",
"0xC1e0Bec32f25627c09a05F3B8446B2bC86bf7B1B",
"0x85f1ddB6d7b031CF8f805b782c5f6dd67e96321c",
"0xDD81B66F0f1AD3E3B1B2c1aECDc081AED96a4570",
"0x9f703461fC5f83ac8AB8505900d73eF179ac46c3",
"0xf81Ff3304ab3794701CC8e58A521c03e569F323C",
"0xee7d05AA482857e6C25219D4E092f3eBb47cE6E3",
"0x26A5fa848c38d075Fb070f5d791620DbB41201Da",
"0x07c479aEAfBcdCFd587A324A0A4fF0A10C9efa3F",
"0x8683f3aE082F868e7f6F1eef0daa994Bb96841c3",
"0xECd4F55Ee1839F74612c64B2fbF0892eDD1f7C75",
"0x6B7ae8C985852A1CA666E62bAa820Baba766EBCB",
"0x261B29a97B069129bafE442cfFE071C2220e193C",
"0x2D1F067077C36ba262e72A73A15386b418Adb5bF",
"0xcb6CE539c4F27a844A60606393758A181b53387e",
"0x3b6896EA1807c8300a4db54d48f35BC7dF77D810",
"0x3902e1Ad1F0b69898fAA557D659a34D7ccc014FD",
"0x544a86BC4A74b9886d6e1769C1a09D471A8e05BC",
"0x2B4376636bFacbbC3073FF6d18445DbF40EF00C8",
"0xA1544A146e6aF3e1D7Eef584934fe153214AB690",
"0x528D4c0ecE7d1aE30990EF73BbF09e6888855Bd3",
"0x533b9fccdf0bfbf89ae0e82167f7dcac9ee7986a",
"0xeA6aFe7D62e7639A42A666c661b8498538e5c448",
"0x0F1cCdd5b82F2A24bC3dD684297470D5543E668D",
"0xAF699Dc747eb2EC5C638eD43A9148A53B388e9E5",
"0xBbC3e60FeF8E921caF626c0FbF2d8De5C3A0c181",
"0x5cc38c9Ddfaf6448d13066a9750D8a78A0D3f771",
"0xf399F11e15E1362af94935fa485610A8cb70B2A4",
"0xEa4c9f20217A173a675dD61771DD92F63c63dc36",
"0x5Ec34D71ccaE9930368f5D2EcE52E2FA30748Ff3",
"0x6D30e14f1499a7c6a7A6affA758a90AbcC7c3EF5",
"0x408D1c0E95B8B458717FAafc490a656c5bCd158B",
"0x17808B9796B24026e801d49cAf3e0Ff206069627",
"0xeD1b37Fcdc89970A5E7BD96c42A7BD0FD6AbdF96",
"0x7aC2A33Bb5c612DB5814f169c0d033b0A4CB3056",
"0x9cf0C85c72462c1Cd723DdFd2c6d49A58aACd5E0",
"0x454ba0E771500cE3e12fbe37c7EF155F61f107Db"
]

function init() {

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "c0db0b85222f4f5c82dd2bed1fc843f9",
            }
        }
    };

    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
    });

}

function truncateString(str, length) {
    return str.length > length ? str.substring(0, length - 1) + '.....' : str
}

async function update_total_supply() {
    await contract.methods.totalSupply().call().then(function (res, err) {
        if (res) {
            $('#total_supply').html(res)
            $("#box-total-count").show()
        }
    });
}

async function update_cost() {
    if (publicMint === false) {
        await contract.methods.WLCost().call().then(function (res, err) {
            if (res) {
                mint_costs = parseFloat(web3.utils.fromWei(res, 'ether'))
                $('#mint_costs').html(mint_costs);
            }
        });
    } else {
        await contract.methods.PublicCost().call().then(function (res, err) {
            if (res) {
                mint_costs = parseFloat(web3.utils.fromWei(res, 'ether'))
                $('#mint_costs').html(mint_costs);
            }
        });
    }
}

async function setting_interval() {
    checkInterval = setInterval(async () => {
        hash_proof = $('#hash_proof').text()
        if (hash_proof !== '') {
            clearInterval(checkInterval)
            // Raise Minting
            await WLMint(mint_costs * mint_count, mint_count, hash_proof)
        }
    }, 500);
}

async function update_publicMint() {
    await contract.methods.WLPaused().call().then(async function (res, err) {
        await contract.methods.PublicSalePaused().call().then(function (res2, err) {
            if ((res !== false) && (res2 !== true)) {
                publicMint = true
            } else {
                publicMint = false
            }
        });
    });

}

function after_mint(res) {
    if (res) {
        alert("Your Elixir has been Minted successfully! Check your OpenSea profile to view your NFT.")
    } else {
        alert("Minting Failed. Please try again!")
    }
}

async function WLMint(final_cost, mint_count, hash_proof) {
    var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.whitelistMint(String(mint_count), [hash_proof])
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            after_mint(res)
        });

}

async function public_Mint(final_cost, mint_count) {
    console.log("publicmint")
    var final_wei_Val = (final_cost * Math.pow(10, 18)).toFixedSpecial(0)
    await contract.methods.publicMint(String(mint_count))
        .send({
            from: user_address,
            value: final_wei_Val
        }).then(function (res, err) {
            after_mint(res)
        });

}

async function switch_network(chainId) {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }]
    });
}

async function do_it_Asside() {

    $('#connect_btn').html('....')

    // update publicmint
    await update_publicMint()

    // update cost
    await update_cost();

    // total supply
    await update_total_supply();

    $('#connect_btn').hide()

    $('#updation_con').fadeIn()
}

function check() {
    web3.eth.getAccounts().then(async (tx) => {
        if (tx[0] !== undefined) {
            user_address = tx[0]
            alert("Your wallet has been connected! Proceed to mint.")
            $('#mint_link').html('Wallet: ' + user_address);
            // $('#user_address').html('0x50A023476C1619979c67725bE45Be8629ab27Ff0')
            $('#user_address').html(user_address)

            web3.eth.net.getId().then(async (netId) => {
                if (netId === chainId) {

                    await do_it_Asside()

                    if (publicMint === false) {
                        $('#WLmint_btn').show();
                        await setting_interval();
                        setTimeout(() => {
                            $('#WLmint_btn').on('click', async () => {
                                await WLMint(mint_costs * mint_count, mint_count, hash_proof)
                            });
                        }, 2000);
                    } else {
                        $('#Publicmint_btn').show();
                        $('#Publicmint_btn').click(async () => {
                            await public_Mint(mint_costs * mint_count, mint_count)
                        })
                    }

                } else {
                    switch (chainId) {
                        case 1:
                            alert("Connect to ETH mainnet");
                            break;
                        case 4:
                            alert("Connect to Rinkeby");
                            break;
                    }

                    await switch_network(chainId)

                }
            });
        }
    });
}

async function connectweb3() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        contract = new web3.eth.Contract(t_abi, t_address);
        check()
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (accounts) => {
        location.reload();
    });

    provider.on("chainChanged", (chainId) => {
        location.reload();
    });

    provider.on("networkChanged", (networkId) => {
        location.reload();
    });

}

function set_value(type) {
    if (type == 'increase') {
        if (mint_count != max_count) {
            mint_count++;
        }
    } else {
        if (mint_count != 1) {
            mint_count--;
        }
    }
    final_cost = mint_costs * mint_count
    $('#mint_count').html(mint_count);
}


$(document).ready(() => {
    init();

    $('#connect_btn').click(async () => { await connectweb3(); })

    $('#increase_btn').click(() => {
        set_value('increase');
    })

    $('#decrease_btn').click(() => {
        set_value('decrease');
    })
});



Number.prototype.toFixedSpecial = function (n) {
    var str = this.toFixed(n);
    if (str.indexOf("e+") === -1) return str;

    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += "." + Array(n + 1).join(0);

    return str;
};
