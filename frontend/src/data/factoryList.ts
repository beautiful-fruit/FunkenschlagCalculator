import Factory, { genFactory } from "../context/factory";

const FactoryList: {
    [key: string]: Factory
} = {
    "4": genFactory(4, 2, 0, 0, 0, 1),
    "8": genFactory(8, 3, 0, 0, 0, 2),
    "10": genFactory(10, 2, 0, 0, 0, 2),
    "15": genFactory(15, 2, 0, 0, 0, 3),
    "20": genFactory(20, 3, 0, 0, 0, 5),
    "25": genFactory(25, 2, 0, 0, 0, 5),
    "31": genFactory(31, 3, 0, 0, 0, 6),
    "36": genFactory(36, 3, 0, 0, 0, 7),
    "42": genFactory(42, 2, 0, 0, 0, 6),

    "3": genFactory(3, 0, 2, 0, 0, 1),
    "7": genFactory(7, 0, 3, 0, 0, 2),
    "9": genFactory(9, 0, 1, 0, 0, 1),
    "16": genFactory(16, 0, 2, 0, 0, 3),
    "26": genFactory(26, 0, 2, 0, 0, 5),
    "32": genFactory(32, 0, 3, 0, 0, 6),
    "35": genFactory(35, 0, 1, 0, 0, 5),
    "40": genFactory(40, 0, 2, 0, 0, 6),

    "5": genFactory(5, 2, 2, 0, 0, 1),
    "12": genFactory(12, 2, 2, 0, 0, 2),
    "21": genFactory(21, 2, 2, 0, 0, 4),
    "29": genFactory(29, 1, 1, 0, 0, 4),
    "46": genFactory(46, 3, 3, 0, 0, 7),

    "6": genFactory(6, 0, 0, 0, 1, 1),
    "14": genFactory(14, 0, 0, 0, 2, 2),
    "19": genFactory(19, 0, 0, 0, 2, 3),
    "24": genFactory(24, 0, 0, 0, 2, 4),
    "30": genFactory(30, 0, 0, 0, 3, 6),
    "38": genFactory(38, 0, 0, 0, 3, 7),

    "11": genFactory(11, 0, 0, 1, 0, 2),
    "17": genFactory(17, 0, 0, 1, 0, 2),
    "23": genFactory(23, 0, 0, 1, 0, 3),
    "28": genFactory(28, 0, 0, 1, 0, 4),
    "34": genFactory(34, 0, 0, 1, 0, 5),
    "39": genFactory(39, 0, 0, 1, 0, 6),

    "13": genFactory(13, 0, 0, 0, 0, 1),
    "18": genFactory(18, 0, 0, 0, 0, 2),
    "22": genFactory(22, 0, 0, 0, 0, 2),
    "27": genFactory(27, 0, 0, 0, 0, 3),
    "33": genFactory(33, 0, 0, 0, 0, 4),
    "37": genFactory(37, 0, 0, 0, 0, 4),
    "44": genFactory(44, 0, 0, 0, 0, 5),
    "50": genFactory(50, 0, 0, 0, 0, 6),
}

export default FactoryList;
