
export interface Chunk {offset: number, length: number};

/**
 * This function takes a list of ordered "chunks" (segment positioned at certain "offset" and with
 * a certain "length") and inserts a new chunk in this list.
 * It takes care of inserting the chunk at the right location, and to merge it (if needed) with other
 * existing chunks (such that all chunks are always ordered and without overlap between them,
 * as long as all the chunks have been inserted using this method).
 * A "margin" parameter prevents small gaps between chunks, such that, if margin is 10, and a new chunk
 * is inserted within less that 10 positions of an existing chunk, then the 2 will be merged directly.
 */
export function insertChunk(chunks: Chunk[], offset: number, length: number, margin = 0) {
  let end = offset + length;

  let spliceStart = chunks.length;
  let spliceLength = 0;

  for(let i=0; i<chunks.length; i++) {
    const chunk = chunks[i];
    const chunkOffset = chunk.offset;
    const chunkEnd = chunkOffset + chunk.length;

    // Detect the starting point
    if(i < spliceStart) {
      // Chunk includes the begining of segment
      if(chunkOffset - margin <= offset && chunkEnd + margin >= offset) {
        spliceStart = i; // Insert new chunk here
        offset = Math.min(chunkOffset, offset); // Update the offset/length to "merge" with the chunk
        length = end - offset;
      }
      // Chunk is after the begining of the segment
      else if (chunkOffset > offset) {
        spliceStart = i;
      }
    }

    // Detect the ending point
    if(i >= spliceStart) {
      // Chunk is included in the segment
      if(chunkEnd < end) {
        spliceLength++;
      }
      // Chunk includes the end of segment
      else if(chunkOffset - margin <= end && chunkEnd + margin >= end) {
        spliceLength++; // Delete at least this first chunk
        end = Math.max(chunkEnd, end);
        length = end - offset;
        break;
      }
      // Chunk is after the end of the segment
      else if (chunkOffset > end) {
        break; // All the chunks after this one won't be changed
      }
    }

  }

  chunks.splice(spliceStart, spliceLength, {offset, length});
}

export function equalChunks(a: Chunk[], b: Chunk[]) {
  if(a.length !== b.length) {
    return false;
  }
  for(let i=0; i<a.length; i++) {
    if(a[i].offset !== b[i].offset || a[i].length !== b[i].length) {
      return false;
    }
  }
  return true;
}
