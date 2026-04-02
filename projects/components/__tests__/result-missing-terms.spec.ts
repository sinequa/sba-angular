import { Query } from "@sinequa/core/app-utils";
import { ResultMissingTerms } from "../result/result-missing-terms/result-missing-terms";

const mockSearchService: any = {
    query: null,
    isSearchRouteActive: () => false,
    search: jasmine.createSpy('search')
};

function createComponent(queryText: string): { component: ResultMissingTerms; query: Query } {
    const query = new Query('test');
    query.text = queryText;
    mockSearchService.query = query;
    const component = new ResultMissingTerms(mockSearchService);
    return { component, query };
}

describe("ResultMissingTerms.mustInclude", () => {

    describe("simple term (no brackets)", () => {
        it("should remove the term from query text and add it as a required adjacent concept", () => {
            const { component, query } = createComponent("Server stopped with exit code");
            component.mustInclude("exit");
            // rewriteText normalizes whitespace — double spaces become single
            expect(query.text).toBe('Server stopped with code +[exit]');
        });

        it("should handle a term that is the entire query text", () => {
            const { component, query } = createComponent("server");
            component.mustInclude("server");
            expect(query.text).toBe('+[server]');
        });
    });

    describe("term with square brackets (ES-31285)", () => {
        it("should NOT remove spaces from query text when term contains brackets", () => {
            const { component, query } = createComponent('Server stopped with exit code "stopped by admin"');
            component.mustInclude("[exit code]");
            // Spaces must be preserved — the bug was turning this into "Serverstoppedwithexitcode..."
            expect(query.text).not.toContain('Serverstoppedwithexitcode');
            expect(query.text).toContain('Server');
            expect(query.text).toContain('stopped');
        });

        it("should add the concept with single brackets, not double", () => {
            const { component, query } = createComponent('Server stopped with exit code');
            component.mustInclude("[exit code]");
            // The bug was producing +[[exit code]] instead of +[exit code]
            expect(query.text).not.toContain('[[');
            expect(query.text).toContain('+[exit code]');
        });

        it("should move the bracketed term into a required concept in query text", () => {
            const { component, query } = createComponent('Server stopped with exit code');
            component.mustInclude("[exit code]");
            // "exit code" must appear only inside the concept brackets, not as a plain token
            expect(query.text).toContain('+[exit code]');
            // Plain tokens "exit" and "code" should no longer be present outside the concept
            expect(query.text).toMatch(/^\s*Server stopped with \+\[exit code\]\s*$/);
        });

        it("should preserve quoted phrases when term contains brackets", () => {
            const { component, query } = createComponent('Server stopped with exit code "stopped by admin"');
            component.mustInclude("[exit code]");
            expect(query.text).toContain('"stopped by admin"');
        });
    });

    describe("term with other special regex characters", () => {
        it("should not throw when term contains a dot", () => {
            const { component, query } = createComponent("file.txt is missing");
            expect(() => component.mustInclude("file.txt")).not.toThrow();
            expect(query.text).toContain('+[file.txt]');
        });

        it("should not throw when term contains a plus sign", () => {
            const { component } = createComponent("c++ language");
            expect(() => component.mustInclude("c++")).not.toThrow();
        });
    });

    describe("query with no text", () => {
        it("should add the concept even when query.text is undefined", () => {
            const query = new Query('test');
            query.text = undefined;
            mockSearchService.query = query;
            const component = new ResultMissingTerms(mockSearchService);
            component.mustInclude("[exit code]");
            expect(query.text as unknown as string).toBe('+[exit code]');
        });
    });
});
