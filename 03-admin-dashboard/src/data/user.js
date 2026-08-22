// 연습을 위한 user 더미 데이터
export const users = [
  { id: 1,  name: '김철수', email: 'kim.cs@test.com',   phone: '010-1234-5678', role: '관리자', joinedAt: '2024-01-15' },
  { id: 2,  name: '이영희', email: 'lee.yh@test.com',   phone: '010-2345-6789', role: '일반',   joinedAt: '2024-02-03' },
  { id: 3,  name: '박민수', email: 'park.ms@test.com',  phone: '010-3456-7890', role: '일반',   joinedAt: '2024-02-20' },
  { id: 4,  name: '최지은', email: 'choi.je@test.com',  phone: '010-4567-8901', role: '일반',   joinedAt: '2024-03-11' },
  { id: 5,  name: '정현우', email: 'jung.hw@test.com',  phone: '010-5678-9012', role: '관리자', joinedAt: '2024-03-28' },
  { id: 6,  name: '강수진', email: 'kang.sj@test.com',  phone: '010-6789-0123', role: '일반',   joinedAt: '2024-04-05' },
  { id: 7,  name: '윤태호', email: 'yoon.th@test.com',  phone: '010-7890-1234', role: '일반',   joinedAt: '2024-04-17' },
  { id: 8,  name: '임서연', email: 'lim.sy@test.com',   phone: '010-8901-2345', role: '일반',   joinedAt: '2024-05-02' },
  { id: 9,  name: '한동욱', email: 'han.dw@test.com',   phone: '010-9012-3456', role: '일반',   joinedAt: '2024-05-19' },
  { id: 10, name: '오하늘', email: 'oh.hn@test.com',    phone: '010-0123-4567', role: '관리자', joinedAt: '2024-06-08' },
  { id: 11, name: '서준영', email: 'seo.jy@test.com',   phone: '010-1357-2468', role: '일반',   joinedAt: '2024-06-25' },
  { id: 12, name: '신미라', email: 'shin.mr@test.com',  phone: '010-2468-1357', role: '일반',   joinedAt: '2024-07-14' },
  { id: 13, name: '조성민', email: 'jo.sm@test.com',    phone: '010-3579-4680', role: '일반',   joinedAt: '2024-08-01' },
  { id: 14, name: '배유진', email: 'bae.yj@test.com',   phone: '010-4680-3579', role: '일반',   joinedAt: '2024-08-22' },
  { id: 15, name: '노경훈', email: 'noh.kh@test.com',   phone: '010-5791-6802', role: '일반',   joinedAt: '2024-09-09' },
  { id: 16, name: '문가영', email: 'moon.gy@test.com',  phone: '010-6802-5791', role: '일반',   joinedAt: '2024-09-30' },
  { id: 17, name: '홍재석', email: 'hong.js@test.com',  phone: '010-7913-8024', role: '관리자', joinedAt: '2024-10-16' },
  { id: 18, name: '남지훈', email: 'nam.jh@test.com',   phone: '010-8024-7913', role: '일반',   joinedAt: '2024-11-04' },
  { id: 19, name: '유은정', email: 'yoo.ej@test.com',   phone: '010-9135-0246', role: '일반',   joinedAt: '2024-11-27' },
  { id: 20, name: '권상혁', email: 'kwon.sh@test.com',  phone: '010-0246-9135', role: '일반',   joinedAt: '2024-12-13' },
];

// 사용자 목록 불러오기
export const loadUsers = () => {
  const saved = localStorage.getItem('users');
  if (saved === null) return users;
  try {
    return JSON.parse(saved);
  } catch {
    return users;
  }
};


// 사용자 상세 정보 가져옴
// URL에서 가져온 값은 문자열이므로 Number()를 통해서 숫자로 바꿔주어야함.
export const userDetail = (id) => {
  return loadUsers().find(user => user.id === Number(id));
};


// 사용자
export const userInsert = (newData) => {
  const users = loadUsers();
  const update = [...users, newData]
  localStorage.setItem('users', JSON.stringify(update));
}