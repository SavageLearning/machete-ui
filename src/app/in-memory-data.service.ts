import {InMemoryDbService, RequestInfo, ParsedUrl} from 'angular-in-memory-web-api';
import {RequestMethod, ResponseOptions, URLSearchParams} from '@angular/http';
import {Report} from './reports/models/report';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const DispatchesByMonth =
      [
        {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-1',
        'label': '2016-01',
        'value': 250
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-2',
        'label': '2016-02',
        'value': 355
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-3',
        'label': '2016-03',
        'value': 579
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-4',
        'label': '2016-04',
        'value': 992
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-5',
        'label': '2016-05',
        'value': 837
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-6',
        'label': '2016-06',
        'value': 833
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-7',
        'label': '2016-07',
        'value': 803
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-8',
        'label': '2016-08',
        'value': 799
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-9',
        'label': '2016-09',
        'value': 667
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-10',
        'label': '2016-10',
        'value': 483
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-11',
        'label': '2016-11',
        'value': 422
      }, {
        'id': '2016-01-01T00:00:00-2017-01-01T00:00:00-12',
        'label': '2016-12',
        'value': 296
    }];
    const DispatchesByJob =
      [
        {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-83',
        'label': 'Advanced Gardening',
        'value': 41
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-74',
        'label': 'Basic House Cleaning',
        'value': 54
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-64',
        'label': 'Build retaining wall- Landscaping',
        'value': 1
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-65',
        'label': 'Carpentry  Framing and Cabinetry',
        'value': 15
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-67',
        'label': 'Deep and/or Move in/out Cleaning',
        'value': 59
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-77',
        'label': 'Demolition',
        'value': 29
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-122',
        'label': 'Digging',
        'value': 48
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-63',
        'label': 'Drywall - Hanging Sheetrock',
        'value': 8
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-133',
        'label': 'Drywall - Taping and Sanding',
        'value': 11
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-60',
        'label': 'General Labor',
        'value': 10
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-128',
        'label': 'Hauling',
        'value': 55
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-131',
        'label': 'Insulation',
        'value': 6
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-88',
        'label': 'Landscaping',
        'value': 12
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-68',
        'label': 'Moving Furniture and Boxes',
        'value': 100
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-61',
        'label': 'Painting (roller brush)',
        'value': 42
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-120',
        'label': 'Pressure Washing',
        'value': 1
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-132',
        'label': 'Tile Installation',
        'value': 3
      }, {
        'id': '2017-01-01T00:00:00-2017-03-01T00:00:00-69',
        'label': 'Yardwork',
        'value': 35
    }];
    const reports = [
        {
          'name': 'DispatchesByJob',
          'commonName': 'Dispatches by job, with some other text',
          'description': 'The number of completed dispatches, grouped by job (skill ID)',
          'sqlquery': 'SELECT\r\nconvert(varchar(24), @startDate, 126) + "-" + convert(varchar(23), @endDate, 126) + "-" + convert(varchar(5), min(wa.skillid)) as id,\r\nlskill.text_en  AS label,\r\ncount(lskill.text_en) value\r\nFROM [dbo].WorkAssignments as WA \r\njoin [dbo].lookups as lskill on (wa.skillid = lskill.id)\r\njoin [dbo].WorkOrders as WO ON (WO.ID = WA.workorderID)\r\njoin [dbo].lookups as lstatus on (WO.status = lstatus.id) \r\nWHERE wo.dateTimeOfWork < (@endDate) \r\nand wo.dateTimeOfWork > (@startDate)\r\nand lstatus.text_en = "Completed"\r\ngroup by lskill.text_en',
          'category': 'Dispatches',
          'subcategory': null,
          'idString': 'reportdef',
          'id': 1,
          'data': DispatchesByJob,
          'datecreated': '2017-05-05T10:21:16.957',
          'dateupdated': '2017-05-05T10:21:16.957',
          'createdby': 'Init T. Script',
          'updatedby': 'Init T. Script',
          'idPrefix': 'reportdef1-',
          'columnLabelsJson': '{ "label": "Job types", "value": "Count of jobs"}'

        },
        {
          'name': 'DispatchesByMonth',
          'title': 'A different title for Dispatches by Month',
          'commonName': 'Dispatches by Month, (weee!)',
          'description': 'The number of completed dispatches, grouped by month',
          'sqlquery': 'SELECT\r\nconvert(varchar(23), @startDate, 126) + "-" + convert(varchar(23), @endDate, 126) + "-" + convert(varchar(5), month(min(wo.datetimeofwork))) as id,\r\nconvert(varchar(7), min(wo.datetimeofwork), 126)  AS label,\r\ncount(*) value\r\nfrom workassignments wa\r\njoin workorders wo on wo.id = wa.workorderid\r\njoin lookups l on wo.status = l.id\r\nwhere  datetimeofwork >= @startDate\r\nand datetimeofwork < @endDate\r\nand l.text_en = "Completed"\r\nand wa.workerassignedid is not null\r\ngroup by month(wo.datetimeofwork)',
          'category': 'Dispatches',
          'subcategory': null,
          'idString': 'reportdef',
          'id': 2,
          'data': DispatchesByMonth,
          'datecreated': '2017-05-05T10:21:16.997',
          'dateupdated': '2017-05-05T10:21:16.997',
          'createdby': 'Init T. Script',
          'updatedby': 'Init T. Script',
          'idPrefix': 'reportdef2-',
          'columnLabelsJson': '{ "label": "Month", "value": "Count of jobs"}'
        }
      ];

    return {reports};
  }

  // intercept response from the default HTTP method handlers
  responseInterceptor(response: ResponseOptions, reqInfo: RequestInfo) {
    // response.body = (<SimpleAggregateRow[]>response.body); // matches web api controller
    // const method = RequestMethod[reqInfo.req.method].toUpperCase();
    // const body = JSON.stringify(response.body);
    // console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
    if (typeof reqInfo.query === 'object') {
      // if query parameters present, replace object w/ data key's value.
      // useful for testing; matches API behavior
      response.body = (<Report>response.body).data;
    }
   return response;
  }

  // parseUrl(url: string): ParsedUrl {
  //   try {
  //     const loc = this.getLocation(url);
  //     let drop = 0;
  //     let urlRoot = '';
  //     if (loc.host !== undefined) {
  //       // url for a server on a different host!
  //       // assume it's collection is actually here too.
  //       drop = 1; // the leading slash
  //       urlRoot = loc.protocol + '//' + loc.host + '/';
  //     }
  //     const path = loc.pathname.substring(drop);
  //     let [base, collectionName, id] = path.split('/');
  //     const resourceUrl = urlRoot + base + '/' + collectionName + '/';
  //     [collectionName] = collectionName.split('.'); // ignore anything after the '.', e.g., '.json'
  //     const query = loc.search && new URLSearchParams(loc.search.substr(1));
  //
  //     const result = { base, collectionName, id, query, resourceUrl };
  //     console.log('override parseUrl:');
  //     console.log(result);
  //     return result;
  //   } catch (err) {
  //     const msg = `unable to parse url '${url}'; original error: ${err.message}`;
  //     throw new Error(msg);
  //   }
  // }
  // private getLocation(href: string) {
  //   const l = document.createElement('a');
  //   l.href = href;
  //   return l;
  // };
}
