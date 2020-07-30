import { ProviderFactory } from './providers/provider-factory';
import { NetworkProvider } from './network-models';
import { Record } from '@sinequa/core/web-services';
import { SearchService } from '@sinequa/components/search';
import { RecordNode } from './providers/records-provider';
import { Node } from './network-models';


export function recordsProviderDemo(providerFactory: ProviderFactory, records: Record[]): NetworkProvider[] {
  
  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createStructuralEdgeTypes(doc, {person: person}, "oninsert", "all");

  const provider = providerFactory.createRecordsProvider(doc, struct, records);
  return [provider];
}


export function selectedRecordsProviderDemo(providerFactory: ProviderFactory): NetworkProvider[] {
  
  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createStructuralEdgeTypes(doc, {person: person}, "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, struct);
  return [provider];
}


export function asyncRecordsProviderDemo(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  const doc = providerFactory.createNodeType("doc", 
    providerFactory.createDynamicImageNodeOptions(
      (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
    )
  );

  const query = searchService.makeQuery();
  query.text = "google";
  query.addSelect("treepath:=/Web/Wiki/");
  query.addSelect("sourcestr4:=human");
  query.pageSize = 5;

  const provider = providerFactory.createAsyncRecordsProvider(doc, [], query);
  return [provider];
}


export function crossAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createAggregationEdgeType([company, person], "Company_Person")

  const provider = providerFactory.createAggregationProvider(edge);

  return [provider];
}


export function coocAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createCoocAggregationEdgeType([company, person], "Company_Person_Cooc")

  const provider = providerFactory.createAggregationProvider(edge);

  return [provider];
}


export function typedCoocAggregationDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const edge = providerFactory.createTypedCoocAggregationEdgeType([person, company], "Person_Job_Company_Cooc")

  const provider = providerFactory.createAggregationProvider(edge);

  return [provider];
}

export function coocRecordDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const doc = providerFactory.createRecordNodeType();
  const job = providerFactory.createCompanyNodeType();
  const person = providerFactory.createPersonNodeType();

  const struct = providerFactory.createCoocStructuralEdgeTypes(doc, [job, person], "person_cooc", "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, [struct], true);
  
  return [provider];
}

export function typedCoocRecordDemo(providerFactory: ProviderFactory): NetworkProvider[] {

  const doc = providerFactory.createRecordNodeType();
  const person = providerFactory.createPersonNodeType();
  const company = providerFactory.createCompanyNodeType();

  const struct = providerFactory.createTypedCoocStructuralEdgeTypes(doc, [person, company], "person_job_company", "oninsert", "all");

  const provider = providerFactory.createSelectedRecordsProvider(doc, [struct], true);
  
  return [provider];
}

export function oOTBConfig(providerFactory: ProviderFactory): NetworkProvider[] {

  // Create the node types for standard entities
  const fieldTypes = {
    geo: providerFactory.createGeoNodeType(),
    person: providerFactory.createPersonNodeType(),
    company: providerFactory.createCompanyNodeType()
  }
  // Create the node type for generic documents
  const docNode = providerFactory.createRecordNodeType();

  // Create structural edges from the document nodes to the standard entities
  const structEdges = providerFactory.createStructuralEdgeTypes(docNode, fieldTypes);
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const aggEdges = [
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.person], "Geo_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.company, fieldTypes.person], "Company_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.company], "Geo_Company")
  ];
  
  // Return list of providers
  return [
    providerFactory.createSelectedRecordsProvider(docNode, structEdges),
    providerFactory.createAggregationProvider(aggEdges[0]),
    providerFactory.createAggregationProvider(aggEdges[1]),
    providerFactory.createAggregationProvider(aggEdges[2])
  ];

}


export function wikiAsyncConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for standard entities
  const fieldTypes = {
    geo: providerFactory.createGeoNodeType(),
    person: providerFactory.createPersonNodeType(),
    company: providerFactory.createCompanyNodeType()
  }
  // Create the node type for generic documents
  const docNode = providerFactory.createRecordNodeType();

  // Create structural edges from the document nodes to the standard entities
  const structEdges = providerFactory.createStructuralEdgeTypes(docNode, fieldTypes, "oninsert", "existingnodes");
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const aggEdges = [
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.person], "Geo_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.company, fieldTypes.person], "Company_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.company], "Geo_Company")
  ];
  
  // Create a query to retrieve the list of records
  const query = searchService.makeQuery();
  query.text = "Barack Obama";
  query.addSelect("treepath:=/Web/Wiki/");
  query.pageSize = 3;

  // Return list of providers
  return [
    providerFactory.createAsyncRecordsProvider(docNode, structEdges, query),
    providerFactory.createAggregationProvider(aggEdges[0]),
    providerFactory.createAggregationProvider(aggEdges[1]),
    providerFactory.createAggregationProvider(aggEdges[2])
  ];

}


export function wikiDynConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for standard entities
  const fieldTypes = {
    geo: providerFactory.createGeoNodeType(),
    person: providerFactory.makeNodeTypeDynamic(
      providerFactory.createPersonNodeType(),
      (node: Node) => {
        let query = searchService.makeQuery();
        query.text = node.label;
        query.addSelect("treepath:=/Web/Wiki/");
        query.addSelect("sourcestr4:=human");
        query.pageSize = 1;
        return query
      },
      providerFactory.createDynamicImageNodeOptions(
        (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
      )),
    company: providerFactory.createCompanyNodeType()
  }

  // Create structural edges from the document nodes to the standard entities
  const structEdges = providerFactory.createStructuralEdgeTypes(fieldTypes.person, fieldTypes, "oninsert", "paginate");
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const aggEdges = [
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.person], "Geo_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.company, fieldTypes.person], "Company_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.company], "Geo_Company")
  ];
  
  // Return list of providers
  return [
    providerFactory.createAggregationProvider(aggEdges[0]),
    providerFactory.createAggregationProvider(aggEdges[1]),
    providerFactory.createAggregationProvider(aggEdges[2]),
    providerFactory.createDynamicNodeProvider(fieldTypes.person, structEdges, false)
  ];

}


export function wikiMultiDynConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  
  // Create the node types for standard entities
  const fieldTypes = {
    // geo is a normal node type
    geo: providerFactory.createGeoNodeType(),
    // person is dynamic node type
    person: providerFactory.makeNodeTypeDynamic(
      // it is initialized from a standard person node type
      providerFactory.createPersonNodeType(),
      // a function that returns a query to retrieve the wikipedia page of this person
      (node: Node) => {
        let query = searchService.makeQuery();
        query.text = node.label;
        query.addSelect("treepath:=/Web/Wiki/");
        query.addSelect("sourcestr4:=human");
        query.pageSize = 1;
        return query
      },
      // the node options used when the node has been mutated (sourcevarchar4 contains the wikipedia image URL)
      providerFactory.createDynamicImageNodeOptions(
        (node: Node) => (node as RecordNode).record['sourcevarchar4'] || ""
      ),
      // the node is mutated dynamically immediately after the metadata node is inserted
      "oninsert"),
    // company is a normal node type
    company: providerFactory.createCompanyNodeType()
  }
  
  // Create aggregation edges to link standard entities together (The 3 aggregations are not standard and must be configured on the server)
  const aggEdges = [
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.person], "Geo_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.company, fieldTypes.person], "Company_Person"),
      providerFactory.createAggregationEdgeType([fieldTypes.geo, fieldTypes.company], "Geo_Company")
  ];
  
  // Return list of providers
  const geo_person = providerFactory.createAggregationProvider(aggEdges[0]);
  const cpy_person = providerFactory.createAggregationProvider(aggEdges[1]);
  const geo_cpy = providerFactory.createAggregationProvider(aggEdges[2]);
  return [
    // Aggregation providers
    geo_person, cpy_person, geo_cpy,
    // Dynamic node provider that transform people nodes (in particular it changes their appearance)
    providerFactory.createDynamicNodeProvider(fieldTypes.person, [], false, [geo_person, cpy_person]) // The dynamic nodes are mutate "on insert", meaning we fire multiple search queries to retrieve when new nodes from geo_person and/or cpy_person are created
  ];

}


export function wikiEdgeDynConfig(providerFactory: ProviderFactory, searchService: SearchService): NetworkProvider[] {
  return [];
}
