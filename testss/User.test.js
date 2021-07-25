const User = require('../model/User')
const UserLayer = require('../routes/user/UserLayer')
const UserMain = require('../routes/user/UserMain')
describe('Test', () => {
  beforeEach(async () => {
    baseSample = {
      nama: 'test',
      email: 'test@gmail.com',
      password:"60fd7eb9e92c5f663bce5af3"
    };
  });

  afterEach(async () => {
    jest.restoreAllMocks();
  });

  describe('Function getAll()', () => {
    it('should return getall ', async () => {
      const sample1 = new User(baseSample);
      jest.spyOn(User, 'findOne').mockResolvedValue({...sample1,_id:"60fd7eb9e92c5f663bce5af3"});

      const result = await UserMain.getOne({idLogin:"60fd7eb9e92c5f663bce5af3",id:"60fd7eb9e92c5f663bce5af3"})

      expect(result).toBeTruthy();

    });
  });
});