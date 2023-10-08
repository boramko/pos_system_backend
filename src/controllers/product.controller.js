const db = require("../models");
const MENU = db.MENU;
const CATEGORY = db.CATEGORY;

exports.createMenu = async function(req, res) {
    try {
        const menu = await MENU.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
};

exports.createCategory = async function(req, res) {
    console.log(req);
    console.log("=================================");
    try {
        const category = await CATEGORY.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
};

exports.getMenus = async function(req, res) {
    try {
        const menus = await MENU.findAll();
        res.status(200).json(menus);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
};

exports.getCategories = async function(req, res) {
    try {
        const categories = await CATEGORY.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error');
    }
};

exports.updateMenu = async function(req, res) {
    try {
        const { id } = req.params;
        await MENU.update(req.body, { where: { id } });
        const updatedMenu = await MENU.findByPk(id);
        res.status(200).json(updatedMenu);
    } catch (error) {
        res.status(500).json('Server Error');
    }
};

exports.updateCategory = async function(req, res) {
    try {
        const { id } = req.params;
        await CATEGORY.update(req.body, { where: { id } });
        const updatedCategory = await CATEGORY.findByPk(id);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json('Server Error');
    }
};

exports.deleteMenu = async function(req, res) {
    try {
        const { id } = req.params;
        await MENU.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json('Server Error');
    }
};

exports.deleteCategory = async function(req, res) {
    try {
        const { id } = req.params;
        await CATEGORY.destroy({ where: { id } });
        res.status(204).json();
    } catch (error) {
        res.status(500).json('Server Error');
    }
};

