require('dotenv').config();
var Database = require('firestoreapi');

const db = new Database({
   project_id: process.env.PROJID,
   cache_max_age: process.env.NICEAPP_CACHE_MAX_AGE,
   cache_allocated_memory: process.env.NICEAPP_CACHE_ALLOCATED_MEM,
});


describe("Get a record", () => {
   beforeEach(() => {
      jest.resetModules() // Most important - it clears the cache     
    });
  
    afterAll(() => {
     });


   test("A new record",async () => { 
      const doc = await db.readOne({"collection":"Users","id":"0"});
      expect(doc.data().first_name).toBe('Sandeep');
     
   });

   test("Many records", () => {
     
   });
});