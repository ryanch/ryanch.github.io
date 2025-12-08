const scenes = [

    {
        scene: "home",
        start: {
            setTopText1: "Ntbbq lqsgb qkkxmzr ndt apssqut btqkedpzu yxk dtk yqndtk;",
            setLeftText4: "Ntbbq dqb zxn yxmzr dtk yqndtk;"
        },
        if_FoundFather: {
            nlpMatch: (doc, h) => h.simple(doc).ifNo("not").match("^has? found father").text() != "",
            match: "yxmzr yqndtk",
            gotoScene: "intro"
        },
    },

    {
        scene: "intro",
        start: {
            setTopText1: "Dtk yqndtk sxxgpzu rttcsi exzetkztr: yqetb Ntbbq;",
            setLeftText2: '"Qb ixm: gzxl ndt kpatk pb rki: qzr xmk ekxcb qkt yqpspzu;"',
            setRightText3: '"Ixm hmbn wtupz ixmk fxmkzti nx ypzr ndt eqmbt xy ndt rki kpatk;"'
        },
        if_Begin: {
            match:["wtupz sxxgpzu", "wtupz fxmkzti"],
            nlpMatch: (doc, h) => h.simple(doc).delete("cause of").match("^begin? journey to find? river").text() != "",
            gotoScene: "mcr1"
        },
    },


    {
        scene: "mcr1",
        start: {
            setLeftText1: "Ntbbq fxmkztib yxklqkr: yxssxlpzu ndt xctz rki kpatk wtr;",
            setTopText2: "Bdt exznpzmtb: qzr ypzrb dtk cqnd pb wsxegtr wi wxmsrtkb;"
        },
        if_PathOpen: {
            nlpMatch: (doc, h) => h.simple(doc).ifNo("blocked").match("finds path open?$").text() != "",
            match: ["*Ypzrb [dtk] cqnd [pb] xctz;", "*Ypzrb dtk cqnd"],
            setRightText1: "Zxknd bdt bttb qz qwqzrxztr hpzt lpnd q btqstr rxxk;",
            setBottomText2: "Tqbn bdt bttb phcqbbpwst lxxrb;"
        },
        if_MineOpen: {
            match: [ "*lpnd q [xctz] rxxk" ],
            gotoScene:"mine"
        },
        if_EnterWoods: {
            match: [ "*bttb lxxrb" ],
            gotoScene:"wds"
        },
        if_EnterNorth: {
            match: [ "*fxmkztib Zxknd*" ],
            setTopText1: "Bdt qnnthcnb nx tzntk ndt rxxk xy ndt hpzt wmn pn pb btqstr;"
        },
    },


    {
        scene: "wds",
        start: {
            setTopText1: "Ntbbq lqsgb ndkxmud ndt beqki rtzbt yxktbn ndqn pb wtbprt ndt rki kpatk: stqapzu ndt hpzt tznkqzet yqk wtdpzr;",
            setBottomText2: "Qdtqr ndt cqnd pb q bnttc pzespzt; Pz ndt rpbnqzet: Ntbbq dtqkb kmbdpzu lqntk;",
            setLeftText3: "Ntbbq pb ckxmr yxk zxn nmkzpzu wqeg;",
            setRightText4: "Ntbbq pb mzbmkt py bdt bdxmsr pzatbnpuqnt ndt kpatk;"
        },
        if_Return: {
            match: ["[Ntbbq pb] [yxk] nmkzpzu wqeg" ],
            gotoScene:"mcr1"
        },
        if_Steam: {
            nlpMatch: (doc, h) => h.simple(doc).match("^(walks|investigate) (water|river)$").text() != "",
            match: ["[Ntbbq] [bdxmsr] pzatbnpuqnt ndt kpatk" ,"[Ntbbq] [bdxmsr] pzatbnpuqnt lqntk" ],
            gotoScene:"rs001"
        },
    },


    {
        scene: "mine",
        start: {
            setLeftText1: "Ntbbq pb qn ndt tznkqzet nx ndt hpzt: cttgpzu pzbprt ndt rqkg pzntkpxk;",
            setBottomText2:"Pzbprt Ntbbq bttb q nxked: mzspn;",
            setRightText3: "Ntbbq pb mzbmkt ldtkt nx ux xk nx stqat;"
        },
        if_HoldingTorch: {
            match:["[Pzbprt] Ntbbq bttb q nxked"],
            gotoScene:"ml10"
        },
        if_GoingBack: {
            match: ["[Ntbbq] [pb] [uxpzu] [nx] stqat"  ],
            gotoScene:"mcr1"
        },

    },

    {
        scene: "ml10",
        start: {
            setLeftText1: "Ntbbq pb qn ndt tznkqzet nx ndt hpzt: bdt pb dxsrpzu q nxked bx bdt eqz btt;",
            setTopText2: "Ndtkt pb q sqrrtk bdt eqz nqgt mc;",
            setBottomText3: "Ndtkt qkt bnqpkb uxpzu rxlz;",
            setRightText4: "Ntbbq pb mzbmkt ldtkt nx ux xk nx stqat;"
        },
        if_GoingUp: {
            match: ["[nqgt] sqrrtk [mc]", "[Ntbbq] uxpzu mc", "Ndtkt pb q sqrrtk bdt uxpzu mc", "nqgt mc", "bdt nqgt sqrrtk mc" ],
            gotoScene:"mup12"
        },
        if_GoingDown: {
            match: ["[nqgt] bnqpkb [uxpzu] [rxlz]", "[Ntbbq] uxpzu rxlz" ],
            gotoScene:"md01"
        },
        if_GoingBack: {
            match: ["[Ntbbq] [pb] [uxpzu] [nx] stqat"  ],
            gotoScene:"mcr1"
        },

    },


    {
        scene: "mup12",
        start: {
            setBottomText1: "Ntbbq esphwb q sqrrtk ndqn uxtb xz yxk ldqn btthb spgt tntkzpni;",
            setTopText2: "Ntbbq ktqedtb ndt nxc xy ndt sqrrtk: qzr ypzrb q bhqss kxxh;",
            setLeftText3: "Ndt kxxh dqb q eqkatr rxxklqi ldped stqrb xmnbprt nx q sqzrpzu;",
            setRightText4: "Ntbbq bpnb rxlz yxk q sxzu rtbtkatr ktbn;"
        },
        if_GoingDown: {
            match: ["Ntbbq uxtb rxlz [sqrrtk]","Ntbbq uxtb rxlz [ndt] sqrrtk", "[Ntbbq] esphwb rxlz [sqrrtk]", "[Ntbbq] esphwb rxlz ndt sqrrtk" ],
            gotoScene:"ml10"
        },
        if_GoingOut: {
            nlpMatch: (doc, h) => doc.delete('#Determiner').delete('#Adverb').delete("her").delete("Tessa").match("^#Verb outside landing?").text() != "",
            match: ["Ntbbq uxtb [nx ndt] xmnbprt [sqzrpzu]", "Ntbbq uxtb nx [ndt] sqzrpzu", "ktqedtb [eqkatr] rxxklqi [ldped stqrb] xmnbprt nx q sqzrpzu;", "[Ntbbq] uxtb xmnbprt" ],
            gotoScene:"mv99"
        },

    },


    {
        scene: "mv99",
        start: {
            setLeftText1: "Ntbbq topnb ndt eqat nx q blttcpzu aptl xy ndt kpatk;",
            setTopText2:"Bdt xwbtkatb ndt kpatk ysxlpzu rxlz ndt hxmznqpz: qzr bnxccpzu pz esxmr xy bntqh;",
            setBottomText3: "Pz ndt bntqh: bdt xwbtkatb ndt mzhpbnqgqwst bdqct xy q rkquxz;",
            setRightText4: "Qdtqr pb q bdqwwi sxxgpzu kxct wkprut;"
        },
        if_Back: {
            match: ["[topn nx] eqat", "[bdt] topnb rxlz ndt hxmznqpz", "Ntbbq topnb rxlz ndt hxmznqpz"],
            gotoScene:"mup12"
        },
        if_EnterBridge: {
            nlpMatch: (doc, h) => h.simple(doc).match("^(view|exits|observes) bridge").text() != "",
            match: ["qdtqr", "[qdtqr nx] [ndt] [kxct] wkprut", "[topnb nx] [ndt] [kxct] wkprut"],
            gotoScene:"b3rd"
        },
        if_DragonLook: {
            match: ["*xwbtkatb [ndt] rkquxz*", "*aptl [ndt] rkquxz*", "aptl rkquxz" ],
            nlpMatch: (doc, h) => h.simple(doc).match("^(view|observes) dragon").text() != "",
            setBottomText3:"Ntbbq xwbtkatb ndt rkquxz pb wpu: ktr: yptki: qzr dxn; Pn pb hqgpzu ndt bntqh lpnd pn'b ysqhtb;"
        },
    },

    {
        scene: "b3rd",
        start: {
            setTopText1: "Ntbbq qcckxqedtb ndt bdqwwi kxct wkprut; Pn rxtb zxn sxxg bqyt nx ekxbb;",
            setBottomText2: "Yqk wtsxl: Ntbbq bttb ndt kqupzu kpatk;",
            setLeftText3: "Ndt bqytni xy ndt eqat eqssb nx Ntbbq;"
        },
        if_Cross: {
            nlpMatch: (doc, h) => h.simple(doc).match("(approaches|cross) bridge$").text() != "",
            match: ["[Ntbbq] ekxbb [ndt] [bdqwwi] [kxct] wkprut", "Ntbbq qcckxqedtb ndt [bdqwwi] [kxct] wkprut nx ekxbb [pn]" ],
            gotoScene:"rvr3"
        },
        if_Back: {
            nlpMatch: (doc, h) => h.simple(doc).match("(sees|approaches) cave$").text() != "",
            match: ["[Ntbbq] qcckxqedtb eqat", "eqat"],
            gotoScene:"mv99"
        },
        if_MakeSafe: {
            nlpMatch: (doc, h) => !h.hasNegation(doc) && doc.match("does? look safe to cross").text() != "",    
            match: ["*Pn sxxg bqyt nx ekxbb*"],
            gotoScene:"sfb32"
        },
    },


    {
        scene: "sfb32",
        start: {
            setTopText1: "Ntbbq qcckxqedtb ndt bdqwwi kxct wkprut; Pn sxxgb bqyt tzxmud nx ekxbb;",
            setBottomText2: "Yqk wtsxl: Ntbbq bttb ndt kqupzu kpatk;",
            setLeftText3: "Ndt bqytni xy ndt eqat eqssb nx Ntbbq;"
        },
        if_Cross: {
            nlpMatch: (doc, h) => h.simple(doc).match("(approaches|cross) bridge$").text() != "",
            match: ["[Ntbbq] ekxbb [ndt] [bdqwwi] [kxct] wkprut", "Ntbbq qcckxqedtb ndt [bdqwwi] [kxct] wkprut nx ekxbb [pn]" ],
            gotoScene:"tr1"
        },
        if_Back: {
            nlpMatch: (doc, h) => h.simple(doc).match("(sees|approaches) cave$").text() != "",
            match: ["[Ntbbq] qcckxqedtb eqat", "eqat"],
            gotoScene:"mv99"
        }
    },


    {
        scene: "tr1",
        start: {
            setTopText1: "Ntbbq tzntkb ypzr q nkqps: qzr hxatb vmpegsi ndkxmud ndt lxxrtr yxktbn;",
            setLeftText2: "Ntbbq kmzb mc q dpss:",
            setRightText3: "qzr ypzrb q wtqk wsxegpzu ndt cqnd;",
            setBottomText4: 'Ntbbq ndpzgb nx dtk btsy: "Fmbn hi smeg: q wtqk? Ldi zxn q zpet kqwwpn!"'
        },
        if_Cross: {
            match: ["[qzr] ypzrb q [zpet] kqwwpn wsxegpzu ndt cqnd", "[qzr] ypzrb q [zpet] kqwwpn"],
            gotoScene:"drg00n"
        }
    },


    {
        scene: "drg00n",
        start: {
            setTopText1: "Ntbbq exhtb xmn xy lxxrb: qzr qcckxqedtb ndt kpatk: ktqri nx pzatbnpuqnt: qzr pb ktlqkrtr lpnd q estqk aptl xy q rkquxz;",
            setBottomText2: "Ndt rkquxz pb wsxlpzu ypkt nx wxps qlqi ndt ysxlpzu kpatk;",
            setLeftText3: "Ykxh ndpb rpbnqzet pn pb mzestqk ldi ndt rkquxz pb rxpzu ndpb;"
        },
        if_LookCloser: {
            match: "*pzatbnpuqnt [ndt] rkquxz*", 
            gotoScene: "dri_1"
        },
        if_ItIsClear: {
            match: "*estqk ldi [ndt] rkquxz*",
            setRightText1:"Ntbbq umtbbtb ndt rkquxz lqznb nx cktatzn ndt lqntk ykxh ysxlpzu: wmn rxtb zxn gzxl ldi;"
        }
    },

    {
        scene: "dri_1",
        start: {
            setTopText1: "Ntbbq eqktymssi qcckxqedtb ndt rkquxz nx rtntkhpzt ldqn pb uxpzu xz;",
            setBottomText2: "Ntbbq zxnpetb pz ndt kpatk wtr pb q rkquxz tuu?",
            setLeftText3: "Py qzi lqntk ktqedtb ndt tuu: ndt rkquxz pzbprt lpss rpt - pn hmbn wt gtcn lqkh qn qss nphtb;",
            setRightText3: "Ndpb tocsqpzb ndt rkquxz'b wtdqapxk: pn pb ckxntenpzu ndt tuu;"
        },
        if_ProtectEgg: {
            match: ["Ntbbq ckxntenpzu [ndt] tuu", "[Ntbbq] ckxnten [ndt] tuu", "Ntbbq ckxnten [ndt] tuu ykxh [ndt] lqntk", "Ntbbq ckxntenpzu [ndt] tuu ykxh [ndt] lqntk"  ],
            gotoScene: "drh01"
        },
        if_ApproachEgg: {
            match: ["Ntbbq [eqktymssi] qcckxqedtb ndt tuu"],
            setTopText1: "Ntbbq qcckxqedtb ndt tuu nx btt py bdt eqz dtsc ckxnten pn ykxh ndt lqntk;"
        }
    },

    {
        scene: "drh01",
        start: {
            setLeftText1: "Ntbbq kmzb pznx ndt rki kpatk wtr: qzr ktnkptatb ndt tuu; Qb bxxz qb bdt spynb ndt tuu: ndt rkquxz bnxcb wsxlpzu ypkt: qzr lqnedtb Ntbbq;",
            setTopText2: "Qb ndt lqntk bnqknb nx ysxl quqpz: Ntbbq bntcb xmn xy kpatk nx ux nxlqkrb ndt rkquxz;",
            setRightText3: "Ntbbq csqetb ndt tuu qn ndt yttn xy ndt rkquxz qzr bsxlsi wqegb qlqi;",
            setBottomText4: "Ndt rkquxz ktnkptatb ndt tuu: qzr ysib qlqi nx pnb dxht;"
        },
        if_goHome: {
            match: ["[Ntbbq] bnqknb dxht", "[Ntbbq] ux dxht", "[Ntbbq] ux nxlqkrb dxht", "[nx] dxht"],
            gotoScene: "s902"
        }
    },

    {
        scene: "s902",
        start: {
            setLeftText1: "Ntbbq ktnmkzb dxht qzr ypzrb dtk yqndtk;",
            setTopText2: 'Dtk yqndtk bqib: "Ixm bxsatr ndt cmjjst: bqapzu ndt rkquxz tuu lqb ndt bxsmnpxz;"',
            setRightText3: '"Exzukqnmsqpxzb?"',
            setBottomText4: "Ndt apssqut etsstwkqnt ndtpk ztl dtkx: Ntbbq?"
        }
    },

    {
        scene: "md01",
        start: {
            setLeftText1: "Ntbbq rtbetzrb bnqpkb pz ndt hpzt: uxpzu rttc pznx ndt hxmznqpz;",
            setTopText2: "Zx lxzrtk ndt apssqutkb rxz'n ktnmkz nx ndpb hpzt;",
            setRightText3: "Ndt ukxmzr pb bspcctki bdt pb exzetkztr bdt hqi mc qzr yqss;",
            setBottomText4: "Ntbbq pb mzbmkt py bdt bdxmsr exznpzmt rxlz;"
        },
        if_GoingUp: {
            match: ["Ntbbq [bdxmsr] ktnmkz [mc]", "[bdt] [bdxmsr] ktnmkz [mc]" ],
            gotoScene:"mine"
        },
        if_GoingDown: {
            match: ["Ntbbq [bdxmsr] exznpzmt rxlz", "[bdt] [bdxmsr] exznpzmt rxlz" ],
            gotoScene:"mdd"
        },

    },


    {
        scene: "mdd",
        start: {
            setTopText1: "Ntbbq exznpzmtb rttctk pznx ndt eqat: qzr sxxbtb dtk yxxnpzu qzr yqssb;",
            setBottomText2: "Ntbbq lqgtb qyntk yqsspzu: qzr ypzrb dtkbtsy qn ndt wxnnxh xy q rttc cpn;",
            setRightText3: "Xz ndt kpudn: bdt dtqkb kmzzpzu lqntk;",
            setLeftText4: "Wtbprt dtk pb ndt nxked: ldped pb tonpzumpbdtr;"
        },
        if_LightTorch: {
            match: ["Wtbprt dtk pb ndt nxked", "ypzrb nxked wtbprt dtk" ],
            gotoScene:"mddli1"
        }
    },

    {
        scene: "mddli1",
        start: {
            setTopText1: "Ntbbq lqgtb qyntk yqsspzu: qzr ypzrb dtkbtsy qn ndt wxnnxh xy q rttc cpn; Hpkqemsxmbsi: lpnd q spn nxked pz dtk dqzr;",
            setRightText2: "Xz ndt kpudn: bdt dtqkb kmzzpzu lqntk;",
            setBottomText3: "Lpnd ndt spudn: bdt eqz btt ndtkt pb zxn q cqnd nx ndt lqntk;"
        },
        if_LightTorch: {
            match: ["*ndtkt pb q cqnd nx ndt lqntk", "*btt [ndtkt] [pb] [q] cqnd nx [ndt] lqntk", "*[btt] ndtkt pb [q] cqnd nx [ndt] lqntk" ],
            gotoScene:"rvr3"
        }
    },

    {
        scene: "rvr3",
        start: {
            setTopText1: "Ntbbq yqssb pznx ndt kpatk: ldped pb kmzzpzu ykttsi;",
            setBottomText2: "Ntbbq dqb rpyypemsni blphpzu pz ndt bnkxzu emkktzn;"
        },
        if_TryRunOnRiver: {
            match:["Ntbbq [pb] kmzzpzu pz [ndt] kpatk"],
            setLeftText1:"Ntbbq qnnthcnb nx kmz xz ndt kpatk: ldped yqpsb;"
        },
        if_CanSwim: {
            nlpMatch: (doc, h) => doc.delete('#Determiner').delete("her").delete("Tessa").delete("she").ifNo("difficulty").if("(river|current)").match("is swiming in").text() !="",
            match: ["Ntbbq pb blphpzu pz ndt [bnkxzu] emkktzn;", "Ntbbq pb blphpzu pz ndt [bnkxzu] kpatk;", "[Ntbbq] blphpzu pz ndt [bnkxzu emkktzn] [kpatk]" ],
            gotoScene:"rs001"
        }
    },

    {
        scene: "rs001",
        start: {
            setLeftText1: "Ntbbq ktqedtb ndt kpatk bdxkt;",
            setTopText2: "Xndtk ndqz ndpb xzt cqned xy rki sqzr: ndtkt pb zx xndtk estqk csqet nx bnqzr;",
            setBottomText3: "Qss qkkxmzr ndt bdxkt qkt rtzbt bdqkc wmbdtb;"
        },
        if_clearPath: {
            nlpMatch: (doc, h) => doc.match("^all? arround the shore (is|are) (clear land|bushes|place to stand)$").text() != "",
            match: ["[qss] qkkxmzr bdxkt qkt estqk sqzr", "[qss] qkkxmzr ndt bdxkt qkt wmbdtb", "[Ntbbq] pb bmkt ldtkt nx ux"],
            gotoScene: "tr1"
        },
        if_dryLand: {
            match: ["Ntbbq ktqedtb [rki] sqzr", "Ntbbq ktqedtb [ndt] sqzr"],
            setRightText1:"Ntbbq pb xz sqzr yxk bmkt: wmn mzbmkt ldtkt nx ux;"
        }
    }

];
