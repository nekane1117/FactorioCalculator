// 装置
const EQUIPMENT = (function () {
    let tmp = {
        "FURNACE": [{
            "name": "Stone_Furance",
            "spd": 1
        }, {
            "name": "Steel_Furance",
            "spd": 2
        }, {
            "name": "Electric_Furance",
            "spd": 2
        }],
        "ASSEMBLY_MACHINE": [{
            "name": "Assembly_Machine_1",
            "spd": 0.5
        }, {
            "name": "Assembly_Machine_2",
            "spd": 1
        }, {
            "name": "Assembly_Machine_3",
            "spd": 1.25
        }],
        "REFINERY": [{
            "name": "Oil_Refinery",
            "spd": 1
        }],
        "PLANT": [{
            "name": "Chemical_Plant",
            "spd": 1
        }],
        "SILO": [{
            "name": "Rocket_Silo",
            "spd": 1
        }],
        "CENTRIFUGE": [{
            "name": "Centrifuge",
            "spd": 1
        }]
    };

    // エイリアスをつける
    Object.keys(tmp).forEach((key) => {
        for (let item of tmp[key]) {
            Object.defineProperty(tmp[key], item.name, {
                "value": item
            });
        }
    });

    // getメソッド基本これを使う
    Object.defineProperty(tmp, "get", {
        "value": function (equipmentType, equipmentMode, amountOfMaterial) {
            switch (equipmentType) {
                case EQUIPMENT_TYPE.FURNACE:
                    // 炉は多分使わないけど一旦鋼鉄固定
                    return EQUIPMENT.FURNACE.Steel_Furance;
                case EQUIPMENT_TYPE.ASSEMBLY_MACHINE:
                    // 組み立て機
                    if (equipmentMode === EQUIPMENT_MODE.MAXIMUM) {
                        // 最大の場合には3を固定で返す
                        return EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_3;
                    } else if (equipmentMode === EQUIPMENT_MODE.NORMAL) {
                        // 通常は素材の種類にあわせて組み立て機2か3を使う
                        return amountOfMaterial <= 4 ? EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_2 : EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_3;
                    } else {
                        if(amountOfMaterial <= 2){
                          return EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_1;
                        } else if (amountOfMaterial <= 4){
                          return EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_2;
                        } else {
                          return EQUIPMENT.ASSEMBLY_MACHINE.Assembly_Machine_3;
                      }
                    }
                case EQUIPMENT_TYPE.REFINERY:
                    // 精製所は原油しかない
                    return EQUIPMENT.REFINERY.Oil_Refinery;
                case EQUIPMENT_TYPE.PLANT:
                    // プラントは化学プラントしかない
                    return EQUIPMENT.PLANT.Chemical_Plant;
                case EQUIPMENT_TYPE.SILO:
                    // サイロはロケットサイロしかない
                    return EQUIPMENT.SILO.Rocket_Silo;
                case EQUIPMENT_TYPE.CENTRIFUGE:
                    // 遠心分離機は遠心分離機しかない
                    return EQUIPMENT.CENTRIFUGE.Centrifuge;
                default:

            }
        }
    });
    return tmp;
})();

// 装置タイプ
const EQUIPMENT_TYPE = Object.keys(EQUIPMENT).reduce((a, c) => (a[c] = c, a), {});

// 装置モード
// 最大と最小
const EQUIPMENT_MODE = {
    "MINIMUM": "MINIMUM",
    "NORMAL": "NORMAL",
    "MAXIMUM": "MAXIMUM"
};
// レシピ全部
const RECIPES = {
    // 原材料。ここが再起の末尾
    "Water": {},
    "Coal": {},
    "Crude_oil": {},
    "Iron_plate": {},
    "Copper_plate": {},
    "Steel_plate": {},
    "Stone": {},
    "Uranium_238": {},
    "Uranium_235": {},
    "Stone_brick": {},
    // ここから
    "Sulfur": {
        "ingredients": {
            "Water": {
                "amount": 30
            },
            "Petroleum_gas": {
                "amount": 30
            }
        },
        "production": 2,
        "equipment": "PLANT",
        "time": 1
    },
    "Plastic_bar": {
        "ingredients": {
            "Petroleum_gas": {
                "amount": 20
            },
            "Coal": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "PLANT",
        "time": 1
    },
    "Empty_barrel": {
        "ingredients": {
            "Steel_plate": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Iron_stick": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Iron_gear_wheel": {
        "ingredients": {
            "Iron_plate": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Copper_cable": {
        "ingredients": {
            "Copper_plate": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Electronic_circuit": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            },
            "Copper_cable": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Advanced_circuit": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 2
            },
            "Plastic_bar": {
                "amount": 2
            },
            "Copper_cable": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 6
    },
    "Processing_unit": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 20
            },
            "Advanced_circuit": {
                "amount": 2
            },
            "Sulfuric_acid": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Engine_unit": {
        "ingredients": {
            "Steel_plate": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            },
            "Pipe": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Electric_engine_unit": {
        "ingredients": {
            "Engine_unit": {
                "amount": 1
            },
            "Lubricant": {
                "amount": 15
            },
            "Electronic_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Explosives": {
        "ingredients": {
            "Sulfur": {
                "amount": 1
            },
            "Coal": {
                "amount": 1
            },
            "Water": {
                "amount": 10
            }
        },
        "production": 2,
        "equipment": "PLANT",
        "time": 5
    },
    "Battery": {
        "ingredients": {
            "Sulfuric_acid": {
                "amount": 20
            },
            "Iron_plate": {
                "amount": 1
            },
            "Copper_plate": {
                "amount": 1
            },
        },
        "production": 1,
        "equipment": "PLANT",
        "time": 5
    },
    "Battery_equipment": {
        "ingredients": {
            "Battery": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Flying_robot_frame": {
        "ingredients": {
            "Electric_engine_unit": {
                "amount": 1
            },
            "Battery": {
                "amount": 2
            },
            "Steel_plate": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 20
    },
    "Science_Pack_1": {
        "ingredients": {
            "Copper_plate": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Science_Pack_2": {
        "ingredients": {
            "Inserter": {
                "amount": 1
            },
            "Transport_belt": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 6
    },
    "Science_Pack_3": {
        "ingredients": {
            "Engine_unit": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electric_mining_drill": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 12
    },
    "Military_science_pack": {
        "ingredients": {
            "Piercing_rounds_magazine": {
                "amount": 1
            },
            "Grenade": {
                "amount": 1
            },
            "Gun_turret": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Production_science_pack": {
        "ingredients": {
            "Electric_engine_unit": {
                "amount": 1
            },
            "Electric_furnace": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 14
    },
    "High_tech_science_pack": {
        "ingredients": {
            "Battery": {
                "amount": 1
            },
            "Processing_unit": {
                "amount": 3
            },
            "Speed_module_1": {
                "amount": 1
            },
            "Copper_cable": {
                "amount": 30
            },
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 14
    },
    "Solid_fuel": {
        "ingredients": {
            "Light_oil": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "PLANT",
        "time": 3
    },
    "Low_density_structure": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Copper_plate": {
                "amount": 5
            },
            "Plastic_bar": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Rocket_fuel": {
        "ingredients": {
            "Solid_fuel": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Nuclear_fuel": {
        "ingredients": {
            "Rocket_fuel": {
                "amount": 1
            },
            "Uranium_235": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "CENTRIFUGE",
        "time": 60
    },
    "Rocket_control_unit": {
        "ingredients": {
            "Processing_unit": {
                "amount": 1
            },
            "Speed_module_1": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Satellite": {
        "ingredients": {
            "Low_density_structure": {
                "amount": 100
            },
            "Solar_panel": {
                "amount": 100
            },
            "Basic_accumulator": {
                "amount": 100
            },
            "Radar": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 100
            },
            "Rocket_fuel": {
                "amount": 50
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Uranium-fuel-cell": {
        "ingredients": {
            "Iron_plate": {
                "amount": 10
            },
            "Uranium_235": {
                "amount": 1
            },
            "Uranium_238": {
                "amount": 19
            }
        },
        "production": 10,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Sulfuric_acid": {
        "ingredients": {
            "Sulfur": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 1
            },
            "Water": {
                "amount": 100
            }
        },
        "production": 50,
        "equipment": "PLANT",
        "time": 1
    },
    "Heavy_oil": {
        "ingredients": {
            "Water": {
                "amount": 50
            },
            "Crude_oil": {
                "amount": 100
            }
        },
        "production": 10,
        "equipment": "REFINERY",
        "time": 5
    },
    "Light_oil": {
        "ingredients": {
            "Water": {
                "amount": 50
            },
            "Crude_oil": {
                "amount": 100
            }
        },
        "production": 45,
        "equipment": "REFINERY",
        "time": 5
    },
    "Petroleum_gas": {
        "ingredients": {
            "Water": {
                "amount": 50
            },
            "Crude_oil": {
                "amount": 100
            }
        },
        "production": 55,
        "equipment": "REFINERY",
        "time": 5
    },
    "Lubricant": {
        "ingredients": {
            "Heavy_oil": {
                "amount": 10
            }
        },
        "production": 10,
        "equipment": "PLANT",
        "time": 1
    },
    "Wooden_chest": {
        "ingredients": {
            "Wood": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Iron_chest": {
        "ingredients": {
            "Iron_plate": {
                "amount": 8
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Steel_chest": {
        "ingredients": {
            "Steel_plate": {
                "amount": 8
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Active_provider_chest": {
        "ingredients": {
            "Steel_chest": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Buffer_chest": {
        "ingredients": {
            "Steel_chest": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Passive_provider_chest": {
        "ingredients": {
            "Steel_chest": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Requester_chest": {
        "ingredients": {
            "Steel_chest": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Storage_chest": {
        "ingredients": {
            "Steel_chest": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Storage_tank": {
        "ingredients": {
            "Iron_plate": {
                "amount": 20
            },
            "Steel_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Transport_belt": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Fast_transport_belt": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Transport_belt": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Express_transport_belt": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Fast_transport_belt": {
                "amount": 1
            },
            "Lubricant": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Underground_belt": {
        "ingredients": {
            "Iron_plate": {
                "amount": 10
            },
            "Transport_belt": {
                "amount": 5
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Fast_underground_belt": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 40
            },
            "Underground_belt": {
                "amount": 2
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Express_underground_belt": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 80
            },
            "Fast_Underground_belt": {
                "amount": 2
            },
            "Lubricant": {
                "amount": 40
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Splitter": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 5
            },
            "Transport_belt": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Fast_splitter": {
        "ingredients": {
            "Splitter": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Electronic_circuit": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Express_splitter": {
        "ingredients": {
            "Fast_splitter": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Advanced_circuit": {
                "amount": 10
            },
            "Lubricant": {
                "amount": 80
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Pipe": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Pipe_to_ground": {
        "ingredients": {
            "Pipe": {
                "amount": 10
            },
            "Iron_plate": {
                "amount": 5
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Pump": {
        "ingredients": {
            "Engine_unit": {
                "amount": 1
            },
            "Steel_plate": {
                "amount": 1
            },
            "Pipe": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Burner_inserter": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Inserter": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Long_handed_inserter": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 1
            },
            "Inserter": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Fast_inserter": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 2
            },
            "Iron_plate": {
                "amount": 2
            },
            "Inserter": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Filter_inserter": {
        "ingredients": {
            "Fast_inserter": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Stack_inserter": {
        "ingredients": {
            "Fast_inserter": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 15
            },
            "Electronic_circuit": {
                "amount": 15
            },
            "Advanced_circuit": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Stack_filter_inserter": {
        "ingredients": {
            "Stack_inserter": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Small_electric_pole": {
        "ingredients": {
            "Wood": {
                "amount": 2
            },
            "Copper_cable": {
                "amount": 2
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Medium_electric_pole": {
        "ingredients": {
            "Steel_plate": {
                "amount": 2
            },
            "Copper_plate": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Big_electric_pole": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Copper_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Substation": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Copper_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Red_wire": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Copper_cable": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Green_wire": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Copper_cable": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Arithmetic_combinator": {
        "ingredients": {
            "Copper_cable": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Decider_combinator": {
        "ingredients": {
            "Copper_cable": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Constant_combinator": {
        "ingredients": {
            "Copper_cable": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Power_switch": {
        "ingredients": {
            "Iron_plate": {
                "amount": 5
            },
            "Copper_cable": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Rail": {
        "ingredients": {
            "Stone": {
                "amount": 1
            },
            "Iron_stick": {
                "amount": 1
            },
            "Steel_plate": {
                "amount": 1
            }
        },
        "production": 2,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Train_stop": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 10
            },
            "Steel_plate": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Rail_signal": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Rail_chain_signal": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Locomotive": {
        "ingredients": {
            "Engine_unit": {
                "amount": 20
            },
            "Electronic_circuit": {
                "amount": 10
            },
            "Steel_plate": {
                "amount": 30
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 4
    },
    "Artillery_wagon": {
        "ingredients": {
            "Engine_unit": {
                "amount": 64
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Steel_plate": {
                "amount": 40
            },
            "Pipe": {
                "amount": 16
            },
            "Advanced_circuit": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 4
    },
    "Cargo_wagon": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Iron_plate": {
                "amount": 20
            },
            "Steel_plate": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Fluid_wagon": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Steel_plate": {
                "amount": 16
            },
            "Pipe": {
                "amount": 8
            },
            "Storage_tank": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1.5
    },
    "Car": {
        "ingredients": {
            "Engine_unit": {
                "amount": 8
            },
            "Iron_plate": {
                "amount": 20
            },
            "Steel_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Tank": {
        "ingredients": {
            "Engine_unit": {
                "amount": 32
            },
            "Steel_plate": {
                "amount": 50
            },
            "Iron_gear_wheel": {
                "amount": 15
            },
            "Advanced_circuit": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Logistic_robot": {
        "ingredients": {
            "Flying_robot_frame": {
                "amount": 1
            },
            "Advanced_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Construction_robot": {
        "ingredients": {
            "Flying_robot_frame": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Roboport": {
        "ingredients": {
            "Steel_plate": {
                "amount": 45
            },
            "Iron_gear_wheel": {
                "amount": 45
            },
            "Advanced_circuit": {
                "amount": 45
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Concrete": {
        "ingredients": {
            "Stone_brick": {
                "amount": 5
            },
            "Iron_ore": {
                "amount": 1
            },
            "Water": {
                "amount": 100
            }
        },
        "production": 10,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Hazard_concrete": {
        "ingredients": {
            "Concrete": {
                "amount": 10
            }
        },
        "production": 10,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.25
    },
    "Refined_concrete": {
        "ingredients": {
            "Iron_stick": {
                "amount": 8
            },
            "Steel_plate": {
                "amount": 1
            },
            "Concrete": {
                "amount": 20
            },
            "Water": {
                "amount": 100
            }
        },
        "production": 10,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Refined_hazard_concrete": {
        "ingredients": {
            "Concrete": {
                "amount": 10
            }
        },
        "production": 10,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.25
    },
    "Landfill": {
        "ingredients": {
            "Stone": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Cliff_explosives": {
        "ingredients": {
            "Grenade": {
                "amount": 1
            },
            "Explosives": {
                "amount": 10
            },
            "Empty_barrel": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Iron_axe": {
        "ingredients": {
            "Iron_stick": {
                "amount": 2
            },
            "Iron_plate": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Steel_axe": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Iron_stick": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Burner_mining_drill": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 3
            },
            "Stone_furnace": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Electric_mining_drill": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 3
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Pumpjack": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Electronic_circuit": {
                "amount": 5
            },
            "Pipe": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Offshore_pump": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 2
            },
            "Pipe": {
                "amount": 1
            },
            "Iron_gear_wheel": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Boiler": {
        "ingredients": {
            "Stone_furnace": {
                "amount": 1
            },
            "Pipe": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Steam_engine": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 8
            },
            "Pipe": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Steam_turbine": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 50
            },
            "Copper_plate": {
                "amount": 50
            },
            "Pipe": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Solar_panel": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 15
            },
            "Copper_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Basic_accumulator": {
        "ingredients": {
            "Iron_plate": {
                "amount": 2
            },
            "Battery": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Nuclear_reactor": {
        "ingredients": {
            "Concrete": {
                "amount": 500
            },
            "Steel_plate": {
                "amount": 500
            },
            "Advanced_circuit": {
                "amount": 500
            },
            "Copper_plate": {
                "amount": 500
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Heat_exchanger": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Copper_plate": {
                "amount": 100
            },
            "Pipe": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Heat_pipe": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Copper_plate": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Centrifuge": {
        "ingredients": {
            "Concrete": {
                "amount": 100
            },
            "Steel_plate": {
                "amount": 50
            },
            "Advanced_circuit": {
                "amount": 100
            },
            "Iron_gear_wheel": {
                "amount": 100
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 4
    },
    "Stone_furnace": {
        "ingredients": {
            "Stone": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Steel_furnace": {
        "ingredients": {
            "Steel_plate": {
                "amount": 6
            },
            "Stone_brick": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Electric_furnace": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Stone_brick": {
                "amount": 10
            },
            "Advanced_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Assembling_machine_1": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 3
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 9
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Assembling_machine_2": {
        "ingredients": {
            "Iron_plate": {
                "amount": 9
            },
            "Electronic_circuit": {
                "amount": 3
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Assembling_machine_1": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Assembling_machine_3": {
        "ingredients": {
            "Speed_module_1": {
                "amount": 4
            },
            "Assembling_machine_2": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Oil_refinery": {
        "ingredients": {
            "Steel_plate": {
                "amount": 15
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Stone_brick": {
                "amount": 10
            },
            "Electronic_circuit": {
                "amount": 10
            },
            "Pipe": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Chemical_plant": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 5
            },
            "Pipe": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Speed_module_1": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Speed_module_2": {
        "ingredients": {
            "Speed_module_1": {
                "amount": 4
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Speed_module_3": {
        "ingredients": {
            "Speed_module_2": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 60
    },
    "Effectivity_module_1": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Effectivity_module_2": {
        "ingredients": {
            "Effectivity_module_1": {
                "amount": 4
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Effectivity_module_3": {
        "ingredients": {
            "Effectivity_module_2": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 60
    },
    "Productivity_module_1": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Productivity_module_2": {
        "ingredients": {
            "Productivity_module_1": {
                "amount": 4
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Productivity_module_3": {
        "ingredients": {
            "Productivity_module_2": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 60
    },
    "Repair_pack": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 2
            },
            "Iron_gear_wheel": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Lamp": {
        "ingredients": {
            "Iron_plate": {
                "amount": 1
            },
            "Iron_stick": {
                "amount": 3
            },
            "Electronic_circuit": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Lab": {
        "ingredients": {
            "Transport_belt": {
                "amount": 4
            },
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Electronic_circuit": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Basic_beacon": {
        "ingredients": {
            "Steel_plate": {
                "amount": 10
            },
            "Electronic_circuit": {
                "amount": 20
            },
            "Advanced_circuit": {
                "amount": 20
            },
            "Copper_cable": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Programmable_speaker": {
        "ingredients": {
            "Iron_plate": {
                "amount": 5
            },
            "Copper_cable": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 4
            },
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 2
    },
    "Pistol": {
        "ingredients": {
            "Copper_plate": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Submachine_gun": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Copper_plate": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Shotgun": {
        "ingredients": {
            "Iron_plate": {
                "amount": 15
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Copper_plate": {
                "amount": 10
            },
            "Wood": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Combat_shotgun": {
        "ingredients": {
            "Steel_plate": {
                "amount": 15
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Copper_plate": {
                "amount": 10
            },
            "Wood": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Rocket_launcher": {
        "ingredients": {
            "Iron_plate": {
                "amount": 5
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Electronic_circuit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Flamethrower": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Iron_gear_wheel": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Firearm_magazine": {
        "ingredients": {
            "Iron_plate": {
                "amount": 4
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 1
    },
    "Piercing_rounds_magazine": {
        "ingredients": {
            "Firearm_magazine": {
                "amount": 1
            },
            "Copper_plate": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Uranium_rounds_magazine": {
        "ingredients": {
            "Piercing_rounds_magazine": {
                "amount": 1
            },
            "Uranium_238": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Shotgun_shells": {
        "ingredients": {
            "Copper_plate": {
                "amount": 2
            },
            "Iron_plate": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Piercing_shotgun_shells": {
        "ingredients": {
            "Shotgun_shells": {
                "amount": 2
            },
            "Copper_plate": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Rocket": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            },
            "Explosives": {
                "amount": 1
            },
            "Iron_plate": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Explosive_rocket": {
        "ingredients": {
            "Rocket": {
                "amount": 1
            },
            "Explosives": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Atomic_bomb": {
        "ingredients": {
            "Processing_unit": {
                "amount": 20
            },
            "Explosives": {
                "amount": 10
            },
            "Uranium_235": {
                "amount": 30
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 50
    },
    "Cannon_shell": {
        "ingredients": {
            "Steel_plate": {
                "amount": 2
            },
            "Plastic_bar": {
                "amount": 2
            },
            "Explosives": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Uranium_cannon_shell": {
        "ingredients": {
            "Cannon_shell": {
                "amount": 1
            },
            "Uranium_238": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 12
    },
    "Explosive_cannon_shell": {
        "ingredients": {
            "Steel_plate": {
                "amount": 2
            },
            "Plastic_bar": {
                "amount": 2
            },
            "Explosives": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Explosive_uranium_cannon_shell": {
        "ingredients": {
            "Explosive_cannon_shell": {
                "amount": 1
            },
            "Uranium_238": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 12
    },
    "Artillery_shell": {
        "ingredients": {
            "Explosive_cannon_shell": {
                "amount": 4
            },
            "Explosives": {
                "amount": 8
            },
            "Radar": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Flamethrower_ammo": {
        "ingredients": {
            "Steel_plate": {
                "amount": 5
            },
            "Light_oil": {
                "amount": 50
            },
            "Heavy_oil": {
                "amount": 50
            }
        },
        "production": 1,
        "equipment": "PLANT",
        "time": 6
    },
    "Grenade": {
        "ingredients": {
            "Iron_plate": {
                "amount": 5
            },
            "Coal": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Poison_capsule": {
        "ingredients": {
            "Steel_plate": {
                "amount": 3
            },
            "Electronic_circuit": {
                "amount": 3
            },
            "Coal": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Slowdown_capsule": {
        "ingredients": {
            "Steel_plate": {
                "amount": 2
            },
            "Electronic_circuit": {
                "amount": 2
            },
            "Coal": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Defender_capsule": {
        "ingredients": {
            "Piercing_rounds_magazine": {
                "amount": 1
            },
            "Electronic_circuit": {
                "amount": 2
            },
            "Iron_gear_wheel": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Distractor_capsule": {
        "ingredients": {
            "Defender_capsule": {
                "amount": 4
            },
            "Advanced_circuit": {
                "amount": 3
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Destroyer_capsule": {
        "ingredients": {
            "Distractor_capsule": {
                "amount": 4
            },
            "Speed_module_1": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Cluster_grenade": {
        "ingredients": {
            "Grenade": {
                "amount": 7
            },
            "Explosives": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Iron_armor": {
        "ingredients": {
            "Iron_plate": {
                "amount": 40
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 3
    },
    "Heavy_armor": {
        "ingredients": {
            "Copper_plate": {
                "amount": 100
            },
            "Steel_plate": {
                "amount": 50
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Basic_modular_armor": {
        "ingredients": {
            "Advanced_circuit": {
                "amount": 30
            },
            "Steel_plate": {
                "amount": 50
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 15
    },
    "Power_armor": {
        "ingredients": {
            "Processing_unit": {
                "amount": 40
            },
            "Electric_engine_unit": {
                "amount": 20
            },
            "Steel_plate": {
                "amount": 40
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 20
    },
    "Power_armor_MK2": {
        "ingredients": {
            "Effectivity_module_3": {
                "amount": 5
            },
            "Speed_module_3": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 40
            },
            "Steel_plate": {
                "amount": 40
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 25
    },
    "Portable_solar_panel": {
        "ingredients": {
            "Solar_panel": {
                "amount": 5
            },
            "Advanced_circuit": {
                "amount": 1
            },
            "Steel_plate": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Portable_fusion_reactor": {
        "ingredients": {
            "Processing_unit": {
                "amount": 250
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Energy_shield": {
        "ingredients": {
            "Advanced_circuit": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Energy_shield_MK2": {
        "ingredients": {
            "Energy_shield": {
                "amount": 10
            },
            "Processing_unit": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Battery_equipment_MK2": {
        "ingredients": {
            "Battery_equipment": {
                "amount": 10
            },
            "Processing_unit": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Personal_laser_defense": {
        "ingredients": {
            "Processing_unit": {
                "amount": 1
            },
            "Steel_plate": {
                "amount": 5
            },
            "Laser_turret": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Basic_exoskeleton_equipment": {
        "ingredients": {
            "Processing_unit": {
                "amount": 10
            },
            "Electric_engine_unit": {
                "amount": 30
            },
            "Steel_plate": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Night_vision": {
        "ingredients": {
            "Advanced_circuit": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Discharge_defense": {
        "ingredients": {
            "Processing_unit": {
                "amount": 5
            },
            "Steel_plate": {
                "amount": 20
            },
            "Laser_turret": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Personal_roboport": {
        "ingredients": {
            "Advanced_circuit": {
                "amount": 10
            },
            "Iron_gear_wheel": {
                "amount": 40
            },
            "Steel_plate": {
                "amount": 20
            },
            "Battery": {
                "amount": 45
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 10
    },
    "Personal_roboport_MK2": {
        "ingredients": {
            "Personal_roboport": {
                "amount": 5
            },
            "Processing_unit": {
                "amount": 100
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 20
    },
    "Gun_turret": {
        "ingredients": {
            "Iron_gear_wheel": {
                "amount": 10
            },
            "Copper_plate": {
                "amount": 10
            },
            "Iron_plate": {
                "amount": 20
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 8
    },
    "Laser_turret": {
        "ingredients": {
            "Steel_plate": {
                "amount": 20
            },
            "Electronic_circuit": {
                "amount": 20
            },
            "Battery": {
                "amount": 12
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 20
    },
    "Flamethrower_turret": {
        "ingredients": {
            "Steel_plate": {
                "amount": 30
            },
            "Iron_gear_wheel": {
                "amount": 15
            },
            "Pipe": {
                "amount": 10
            },
            "Engine_unit": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 20
    },
    "Artillery_turret": {
        "ingredients": {
            "Steel_plate": {
                "amount": 60
            },
            "Iron_gear_wheel": {
                "amount": 40
            },
            "Advanced_circuit": {
                "amount": 20
            },
            "Concrete": {
                "amount": 60
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 40
    },
    "Land_mine": {
        "ingredients": {
            "Steel_plate": {
                "amount": 1
            },
            "Explosives": {
                "amount": 2
            }
        },
        "production": 4,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 5
    },
    "Stone_wall": {
        "ingredients": {
            "Stone_brick": {
                "amount": 5
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Gate": {
        "ingredients": {
            "Stone_wall": {
                "amount": 1
            },
            "Steel_plate": {
                "amount": 2
            },
            "Electronic_circuit": {
                "amount": 2
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Radar": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 5
            },
            "Iron_gear_wheel": {
                "amount": 5
            },
            "Iron_plate": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Basic_electric_discharge_defense_remote": {
        "ingredients": {
            "Electronic_circuit": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Artillery_targeting_remote": {
        "ingredients": {
            "Processing_unit": {
                "amount": 1
            },
            "Radar": {
                "amount": 1
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 0.5
    },
    "Rocket_silo": {
        "ingredients": {
            "Steel_plate": {
                "amount": 1000
            },
            "Concrete": {
                "amount": 1000
            },
            "Pipe": {
                "amount": 100
            },
            "Processing_unit": {
                "amount": 200
            },
            "Electric_engine_unit": {
                "amount": 200
            }
        },
        "production": 1,
        "equipment": "ASSEMBLY_MACHINE",
        "time": 30
    },
    "Rocket_part": {
        "ingredients": {
            "Low_density_structure": {
                "amount": 10
            },
            "Rocket_fuel": {
                "amount": 10
            },
            "Rocket_control_unit": {
                "amount": 10
            }
        },
        "production": 1,
        "equipment": "SILO",
        "time": 3
    },
    "Space_Science_Pack": {
        "ingredients": {
            "Rocket_part": {
                "amount": 100
            }
        },
        "production": 1000,
        "equipment": "SILO",
        "time": 0
    }
};

// レシピの一覧から作成したアイテムリスト
const ITEM_LIST = Object.keys(RECIPES).reduce((a, c) => {
    a[c] = c;
    return a;
}, {});


// 日本語名
const LOCALIZED_NAME = {
    "Active_provider_chest": "アクティブ供給チェスト",
    "Advanced_circuit": "発展基板",
    "Arithmetic_combinator": "算術回路",
    "Artillery_shell": "長距離砲弾",
    "Artillery_targeting_remote": "遠方照準器",
    "Artillery_turret": "長距離砲タレット",
    "Artillery_wagon": "長距離砲車両",
    "Assembling_machine_1": "組立機1",
    "Assembling_machine_2": "組立機2",
    "Assembling_machine_3": "組立機3",
    "Atomic_bomb": "原子爆弾",
    "Basic_accumulator": "蓄電設備",
    "Basic_beacon": "基本ビーコン",
    "Basic_electric_discharge_defense_remote": "放電モジュール制御装置",
    "Basic_exoskeleton_equipment": "強化外骨格モジュール",
    "Basic_modular_armor": "モジュラーアーマー",
    "Battery": "電池",
    "Battery_equipment": "バッテリーモジュール",
    "Battery_equipment_MK2": "バッテリーモジュールMK2",
    "Big_electric_pole": "大型電柱",
    "Boiler": "ボイラー",
    "Buffer_chest": "バッファーチェスト",
    "Burner_inserter": "燃料式インサータ",
    "Burner_mining_drill": "燃料式掘削機",
    "Cannon_shell": "砲弾",
    "Car": "自動車",
    "Cargo_wagon": "貨物車両",
    "Centrifuge": "遠心分離機",
    "Chemical_plant": "化学プラント",
    "Cliff_explosives": "崖用発破",
    "Cluster_grenade": "クラスターグレネード",
    "Coal": "石炭",
    "Combat_shotgun": "コンバットショットガン",
    "Concrete": "コンクリート床",
    "Constant_combinator": "定数回路",
    "Construction_robot": "建造ロボット",
    "Copper_cable": "銅線",
    "Copper_plate": "銅板",
    "Crude_oil": "原油",
    "Decider_combinator": "条件回路",
    "Defender_capsule": "ディフェンダーカプセル",
    "Destroyer_capsule": "デストロイヤーカプセル",
    "Discharge_defense": "携帯放電防御モジュール",
    "Distractor_capsule": "ディストラクターカプセル",
    "Effectivity_module_1": "エネルギー効率モジュール1",
    "Effectivity_module_2": "エネルギー効率モジュール2",
    "Effectivity_module_3": "エネルギー効率モジュール3",
    "Electric_engine_unit": "電気エンジンユニット",
    "Electric_furnace": "電気炉",
    "Electric_mining_drill": "電動掘削機",
    "Electronic_circuit": "電子基板",
    "Empty_barrel": "空のドラム缶",
    "Energy_shield": "エネルギーシールドモジュール",
    "Energy_shield_MK2": "エネルギーシールドモジュールMK2",
    "Engine_unit": "エンジンユニット",
    "Explosive_cannon_shell": "炸裂砲弾",
    "Explosive_rocket": "炸裂ロケット弾",
    "Explosive_uranium_cannon_shell": "炸裂ウラン砲弾",
    "Explosives": "爆薬",
    "Express_splitter": "超高速分配器",
    "Express_transport_belt": "超高速搬送ベルト",
    "Express_underground_belt": "超高速地下ベルトコンベア",
    "Fast_inserter": "高速インサータ",
    "Fast_splitter": "高速分配器",
    "Fast_transport_belt": "高速搬送ベルト",
    "Fast_underground_belt": "高速地下ベルトコンベア",
    "Filter_inserter": "フィルターインサータ",
    "Firearm_magazine": "通常弾薬",
    "Flamethrower": "火炎放射器",
    "Flamethrower_ammo": "火炎放射器用燃料",
    "Flamethrower_turret": "火炎放射タレット",
    "Fluid_wagon": "タンク貨車",
    "Flying_robot_frame": "飛行用ロボットフレーム",
    "Gate": "ゲート",
    "Green_wire": "グリーンケーブル",
    "Grenade": "手榴弾",
    "Gun_turret": "ガンタレット",
    "Hazard_concrete": "警戒色コンクリート",
    "Heat_exchanger": "熱交換器",
    "Heat_pipe": "ヒートパイプ",
    "Heavy_armor": "重鎧",
    "Heavy_oil": "重油",
    "High_tech_science_pack": "ハイテクサイエンスパック",
    "Inserter": "インサータ",
    "Iron_armor": "鉄の鎧",
    "Iron_axe": "鉄の斧",
    "Iron_chest": "鉄製チェスト",
    "Iron_gear_wheel": "鉄の歯車",
    "Iron_plate": "鉄板",
    "Iron_stick": "鉄筋",
    "Lab": "研究所",
    "Lamp": "ランプ",
    "Land_mine": "地雷",
    "Landfill": "埋立地",
    "Laser_turret": "レーザータレット",
    "Light_oil": "軽油",
    "Locomotive": "機関車",
    "Logistic_robot": "物流ロボット",
    "Long_handed_inserter": "ロングアームインサータ",
    "Low_density_structure": "断熱材",
    "Lubricant": "潤滑油",
    "Medium_electric_pole": "中型電柱",
    "Military_science_pack": "軍事サイエンスパック",
    "Night_vision": "暗視モジュール",
    "Nuclear_fuel": "核燃料",
    "Nuclear_reactor": "原子炉",
    "Offshore_pump": "汲み上げポンプ",
    "Oil_refinery": "原油精製所",
    "Passive_provider_chest": "パッシブ供給チェスト",
    "Personal_laser_defense": "携帯レーザー防御モジュール",
    "Personal_roboport": "携帯ロボットステーション",
    "Personal_roboport_MK2": "携帯ロボットステーションMK2",
    "Petroleum_gas": "プロパンガス",
    "Piercing_rounds_magazine": "貫通弾薬",
    "Piercing_shotgun_shells": "貫通ショットガン弾薬",
    "Pipe": "パイプ",
    "Pipe_to_ground": "地下パイプ",
    "Pistol": "ハンドガン",
    "Plastic_bar": "プラスチック棒",
    "Poison_capsule": "毒素カプセル",
    "Portable_fusion_reactor": "携帯核融合炉モジュール",
    "Portable_solar_panel": "携帯ソーラーパネルモジュール",
    "Power_armor": "パワーアーマー",
    "Power_armor_MK2": "パワーアーマーMK2",
    "Power_switch": "電源スイッチ",
    "Processing_unit": "制御基板",
    "Production_science_pack": "製造サイエンスパック",
    "Productivity_module_1": "生産力モジュール1",
    "Productivity_module_2": "生産力モジュール2",
    "Productivity_module_3": "生産力モジュール3",
    "Programmable_speaker": "プログラマブルスピーカー",
    "Pump": "ポンプ",
    "Pumpjack": "油井",
    "Radar": "レーダー",
    "Rail": "レール",
    "Rail_chain_signal": "連動式列車用信号",
    "Rail_signal": "信号",
    "Red_wire": "レッドケーブル",
    "Refined_concrete": "鉄筋コンクリート",
    "Refined_hazard_concrete": "鉄筋警戒コンクリート",
    "Repair_pack": "リペアキット",
    "Requester_chest": "要求チェスト",
    "Roboport": "ロボットステーション",
    "Rocket": "ロケット弾",
    "Rocket_control_unit": "ロケット制御ユニット",
    "Rocket_fuel": "ロケット燃料",
    "Rocket_launcher": "ロケットランチャー",
    "Rocket_part": "ロケット部品",
    "Rocket_silo": "ロケットサイロ",
    "Satellite": "衛星",
    "Science_Pack_1": "サイエンスパック1",
    "Science_Pack_2": "サイエンスパック2",
    "Science_Pack_3": "サイエンスパック3",
    "Shotgun": "ショットガン",
    "Shotgun_shells": "ショットガン弾薬",
    "Slowdown_capsule": "粘着カプセル",
    "Small_electric_pole": "小型電柱",
    "Solar_panel": "ソーラーパネル",
    "Solid_fuel": "固形燃料",
    "Space_Science_Pack": "スペースサイエンスパック",
    "Speed_module_1": "生産速度モジュール1",
    "Speed_module_2": "生産速度モジュール2",
    "Speed_module_3": "生産速度モジュール3",
    "Splitter": "分配器",
    "Stack_filter_inserter": "スタックフィルターインサータ",
    "Stack_inserter": "スタックインサータ",
    "Steam_engine": "蒸気機関",
    "Steam_turbine": "蒸気タービン",
    "Steel_axe": "鋼鉄の斧",
    "Steel_chest": "鋼鉄製チェスト",
    "Steel_furnace": "鋼鉄の炉",
    "Steel_plate": "鋼材",
    "Stone": "石",
    "Stone_brick": "石レンガ",
    "Stone_furnace": "石の炉",
    "Stone_wall": "石の防壁",
    "Storage_chest": "貯蔵チェスト",
    "Storage_tank": "貯蔵タンク",
    "Submachine_gun": "サブマシンガン",
    "Substation": "変電所",
    "Sulfur": "硫黄",
    "Sulfuric_acid": "硫酸",
    "Tank": "戦車",
    "Train_stop": "駅",
    "Transport_belt": "搬送ベルト",
    "Underground_belt": "地下ベルトコンベア",
    "Uranium-fuel-cell": "燃料棒",
    "Uranium_235": "ウラン-235",
    "Uranium_238": "ウラン-238",
    "Uranium_cannon_shell": "劣化ウラン砲弾",
    "Uranium_rounds_magazine": "劣化ウラン弾薬",
    "Water": "水",
    "Wooden_chest": "木製チェスト"
};

// JSONに定義されているものをDeepCopyする
// 定義されていないものはそのままコピーするので子要素にいるとよく分からない動きになる気がする
function JSONDeepCopy(json) {
    switch (Object.prototype.toString.call(json)) {
        case "[object Number]":
        case "[object Boolean]":
        case "[object String]":
        case "[object Null]":
        case "[object Undefined]":
            // プリミティブ型はそのまま返す。
            return json;

        case "[object Array]":
            // 配列の場合再帰的に個々の要素をディープコピーしていく
            // nullやundefinedが指定されている場合も作成する
            return json.map(x => JSONDeepCopy(x));
        case "[object Object]":
            // オブジェクトの場合各キーに対して再起定期にディープコピーしていく
            // nullやundefinedが指定されている場合も作成する
            return Object.keys(json).reduce((accum, current) => {
                accum[current] = JSONDeepCopy(json[current]);
                return accum;
            }, {});
        default:
            // とりあえずそのまま返す
            console.log("JSONに定義されていないものが指定されました。動作不定のためシャローコピーします"); // eslint-disable-line no-console
            console.dir(json); // eslint-disable-line no-console
            return json;

    }

}

function inputChk(Item, requiredProduction, equipmentMode, result) {
    let chkRes = {
        "state": false,
        "message": []
    };

    if (!(Item in ITEM_LIST)) {
        chkRes.message.push("Illegal argument ! Item is " + JSON.stringify(Item) + "：Select from ITEM_LIST");
    }
    if (isNaN(Number(requiredProduction)) || Number(requiredProduction) <= 0) {
        chkRes.message.push("Illegal argument requiredProduction ! requiredProduction is " + JSON.stringify(requiredProduction) + "：Numeric and greater than 0");
    }
    if (!(equipmentMode in EQUIPMENT_MODE)) {
        chkRes.message.push("Illegal argument equipmentMode ! equipmentMode is " + JSON.stringify(equipmentMode) + "：Select from EQUIPMENT_MODE or default");
    }
    if ("[object Object]" !== Object.prototype.toString.call(result)) {
        chkRes.message.push("Illegal argument result ! result is " + JSON.stringify(result) + "：result type must be object");
    }

    // メッセージがなければ状態を正にする
    if (chkRes.message.length === 0) {
        chkRes.state = true;
    } else {
        // チェック結果がエラーをスローして終わる
        throw chkRes.message.join("\r\n"); // eslint-disable-line no-console
    }

    // 結果を返す
    return chkRes;
}

/**
 * 計算(jsなので誤差はあきらめる)
 * @param  {String}         Item                                   アイテム名
 * @param  {Number}         requiredProduction                       秒間生産数
 * @param  {EQUIPMENT_MODE} [equipmentMode=EQUIPMENT_MODE.MINIMUM] 装置モード(最大、最小 現在は組み立て機にしか影響しない)
 * @param  {Object}         [result={}]                            結果格納先(reduce的なあれ)
 * @return {Object}                                                結果
 */
function calculate(Item, requiredProduction, equipmentMode = EQUIPMENT_MODE.MINIMUM, result = {}) {
    // 引数チェック
    inputChk(Item, requiredProduction, equipmentMode, result);

    // 対象のアイテムをディープコピー
    let recipe = JSONDeepCopy(RECIPES[Item]);

    // レシピを持っていない場合は戻る
    if (!("ingredients" in recipe)) {
        // 原材料名のものが指定された生産量分必要
        return {
            "name": Item,
            "equipmentName": "input",
            "requiredProduction": requiredProduction
        };
    }

    // 必要な設備を取得
    let equipment = EQUIPMENT.get(recipe.equipment, equipmentMode, Object.keys(recipe.ingredients).length);

    return {
        // 対象アイテムの名前
        "name": Item,
        // 必要な生産速度
        "requiredProduction": requiredProduction,
        // 装置名
        "equipmentName": equipment.name,
        // 必要な装置数
        "numberOfEquipments": requiredProduction * recipe.time / (recipe.production * equipment.spd),
        // 原材料の計算
        "ingredients": Object.keys(recipe.ingredients).map((key) => {
            // 対象の素材
            let target = recipe.ingredients[key];
            // 対象素材の必要生速度
            let ingredientsRequire = target.amount * requiredProduction / recipe.production;
            // 素材の必要生産設備数を計算
            // 装置モードは引き継ぐ
            return calculate(key, ingredientsRequire, equipmentMode);
        })
    };
}

function textOutput(calculateResult, textArray = [], depth = 0) {

    // 自分を書く
    textArray.push(
        "━━".repeat(depth) + "【" + LOCALIZED_NAME[calculateResult.name] + "】<br>" +
        "　　".repeat(depth) + "装置種類     : " + calculateResult.equipmentName + "<br>" +
        "　　".repeat(depth) + "必要装置数   : " + Math.ceil(calculateResult.numberOfEquipments) + "<br>" +
        "　　".repeat(depth) + "必要生産速度 : " + calculateResult.requiredProduction) + "<br>";

    // 子情報へ潜る
    if ("ingredients" in calculateResult) {
        calculateResult.ingredients.forEach((ingredient) => {
            textOutput(ingredient, textArray, depth + 1);
        });
    }
    return textArray;
}


function calculateRawMaterials(calculateResult, result = {}) {

    if (calculateResult.ingredients) {
        calculateResult.ingredients.map(x => calculateRawMaterials(x, result));
    } else {
        // 原材料がない場合、原材料としてカウントする
        if (result[calculateResult.name]) {
            result[calculateResult.name] += calculateResult.requiredProduction;
        } else {
            result[calculateResult.name] = calculateResult.requiredProduction;
        }
    }
    return result;
}
