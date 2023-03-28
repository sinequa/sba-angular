import { insertChunk } from "./chunk";

let chunks: {offset: number; length: number}[] = [];

describe("Insert chunk", () => {

  beforeEach(() => chunks = [
    {offset: 10, length: 100},
    {offset: 200, length: 300},
    {offset: 1000, length: 100},
  ]);

  describe("without margin", () => {

    it("should insert before all", () => {
      insertChunk(chunks, 0, 5);
      expect(chunks.length).toEqual(4);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(5);
    });

    it("should insert after all", () => {
      insertChunk(chunks, 2000, 5);
      expect(chunks.length).toEqual(4);
      expect(chunks[3].offset).toEqual(2000);
      expect(chunks[3].length).toEqual(5);
    });

    it("should insert between", () => {
      insertChunk(chunks, 150, 20);
      expect(chunks.length).toEqual(4);
      expect(chunks[1].offset).toEqual(150);
      expect(chunks[1].length).toEqual(20);
    });

    it("should not change", () => {
      insertChunk(chunks, 20, 5);
      expect(chunks.length).toEqual(3);
    });

    it("should merge with first", () => {
      insertChunk(chunks, 0, 20);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(110);
    });

    it("should merge with first at the end", () => {
      insertChunk(chunks, 100, 20);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(10);
      expect(chunks[0].length).toEqual(110);
    });

    it("should eat the first chunk", () => {
      insertChunk(chunks, 0, 150);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(150);
    });

    it("should eat 2 chunks", () => {
      insertChunk(chunks, 0, 600);
      expect(chunks.length).toEqual(2);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(600);
    });

    it("should eat 1 chunk and merge with another", () => {
      insertChunk(chunks, 0, 400);
      expect(chunks.length).toEqual(2);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(500);
    });

    it("should eat 1 chunk and merge with another", () => {
      insertChunk(chunks, 300, 1000);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(1100);
    });

    it("should merge 2 chunks", () => {
      insertChunk(chunks, 300, 750);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(900);
    });

    it("should join 2 chunks", () => {
      insertChunk(chunks, 0, 10);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(110);
    });

    it("should join 2 chunks after", () => {
      insertChunk(chunks, 500, 100);
      expect(chunks.length).toEqual(3);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(400);
    });

  })


  describe("with margin", () => {

    it("should insert before all", () => {
      insertChunk(chunks, 0, 5, 3);
      expect(chunks.length).toEqual(4);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(5);
    });

    it("should insert after all", () => {
      insertChunk(chunks, 2000, 5, 3);
      expect(chunks.length).toEqual(4);
      expect(chunks[3].offset).toEqual(2000);
      expect(chunks[3].length).toEqual(5);
    });

    it("should insert between", () => {
      insertChunk(chunks, 150, 20, 3);
      expect(chunks.length).toEqual(4);
      expect(chunks[1].offset).toEqual(150);
      expect(chunks[1].length).toEqual(20);
    });

    it("should not change", () => {
      insertChunk(chunks, 20, 5, 3);
      expect(chunks.length).toEqual(3);
    });

    it("should merge with first", () => {
      insertChunk(chunks, 0, 20, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(110);
    });

    it("should merge with first at the end", () => {
      insertChunk(chunks, 100, 20, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(10);
      expect(chunks[0].length).toEqual(110);
    });

    it("should eat the first chunk", () => {
      insertChunk(chunks, 0, 150, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(150);
    });

    it("should eat 2 chunks", () => {
      insertChunk(chunks, 0, 600, 3);
      expect(chunks.length).toEqual(2);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(600);
    });

    it("should eat 1 chunk and merge with another", () => {
      insertChunk(chunks, 0, 400, 3);
      expect(chunks.length).toEqual(2);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(500);
    });

    it("should eat 1 chunk and merge with another", () => {
      insertChunk(chunks, 300, 1000, 3);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(1100);
    });

    it("should merge 2 chunks", () => {
      insertChunk(chunks, 300, 750, 3);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(900);
    });

    it("should join 2 chunks", () => {
      insertChunk(chunks, 0, 10, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(110);
    });

    it("should join 2 chunks after", () => {
      insertChunk(chunks, 500, 100, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(400);
    });


    it("Should merge with margin", () => {
      insertChunk(chunks, 0, 8, 3);
      expect(chunks.length).toEqual(3);
      expect(chunks[0].offset).toEqual(0);
      expect(chunks[0].length).toEqual(110);
    });

    it("Should merge with margin after", () => {
      insertChunk(chunks, 520, 200, 50);
      expect(chunks.length).toEqual(3);
      expect(chunks[1].offset).toEqual(200);
      expect(chunks[1].length).toEqual(520);
    });

    it("Should merge with margin include", () => {
      insertChunk(chunks, 190, 200, 50);
      expect(chunks.length).toEqual(3);
      expect(chunks[1].offset).toEqual(190);
      expect(chunks[1].length).toEqual(310);
    });


    it("Should merge with margin include 2", () => {
      insertChunk(chunks, 190, 940, 50);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(190);
      expect(chunks[1].length).toEqual(940);
    });

    it("Should merge with margin include 2", () => {
      insertChunk(chunks, 190, 800, 50);
      expect(chunks.length).toEqual(2);
      expect(chunks[1].offset).toEqual(190);
      expect(chunks[1].length).toEqual(910);
    });
  })

})
