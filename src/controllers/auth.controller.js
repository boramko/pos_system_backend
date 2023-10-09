const bcrypt = require('bcryptjs');
const db = require("../models");
const USER = db.USER;

const { buildToken, verifyToken } = require('../utils/token');

exports.signup = async function(req, res){
    const { user_id, user_password, user_name } = req.body;
    try {
        // 아이디 중복 체크
        const existingUser = await USER.findOne({ where: { user_id } });
        if (existingUser) {
            return res.status(400).json('이미 중복된 아이디입니다.');
        }
        
        const hashedPassword = bcrypt.hashSync(user_password, 8);
        const newUser = await USER.create({ user_id, user_password: hashedPassword, user_name, user_status: 'u' });
        
        // 토큰 생성
        const token = buildToken(user_id); 
        
        res.status(201).json({
            message: '회원가입이 완료되었습니다.',
            token // 생성된 토큰을 응답에 포함
        });
    } catch (error) {
        res.json({error})
        res.status(500).json('Server Error');
    }
}

exports.login = async function(req, res){
    const { user_id, user_password } = req.body;
    try {
        const user = await USER.findOne({ where: { user_id } });
        if (!user) return res.status(401).json('패스워드 또는 비밀번호 확인해주세요.');
        
        const isValidPassword = bcrypt.compareSync(user_password, user.user_password);
        if (!isValidPassword) return res.status(401).json('패스워드 또는 비밀번호 확인해주세요.');
        
        // 토큰 생성
        const token = buildToken(user_id); 
        
        res.json({ token });
    } catch (error) {
        res.status(500).json('Server Error');
    }
}

exports.userInfo = async function(req, res) {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) return res.status(401).json('No token provided');
    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) return res.status(401).json('No token provided');
    try {
        // 토큰 검증
        const decoded = verifyToken(token);
        console.log(decoded);
        // 토큰에서 사용자 ID 얻기
        const userId = decoded.sub;

        console.log(userId);
        // 사용자 정보 찾기
        const user = await USER.findOne({ where: { user_id: userId } });
        if (!user) return res.status(404).json('User not found');
        res.json(user);
    } catch (error) {
        console.log(error);
        if (error) {
            return res.status(401).json('Invalid token');
        }
        res.status(500).json('Server Error');
    }
}


// exports.checkToken = async function(req, res){
//     const authHeader = req.headers.authorization;

//     if (!authHeader) return res.status(401).send({ isValid: false, error: 'No token provided' });

//     const token = authHeader.split(' ')[1]; // Bearer <token>
//     try {
//         // 토큰 검사
//         const checkStatus = verifyToken(token);
//         if(checkStatus) {
//             res.send({ isValid: true });
//         }else{
//             return res.status(401).send({ isValid: false, error: 'Failed to authenticate token' });
//         }
//     } catch (error) {
//         res.status(500).json('Server Error');
//     }
// }


