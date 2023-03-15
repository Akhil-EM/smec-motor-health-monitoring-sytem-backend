import { Injectable, PipeTransform } from '@nestjs/common';
import { GetGraphDto } from 'src/resources/graphs/dto/get-graph.dto';
@Injectable()
export class GetGraphPipe implements PipeTransform<GetGraphDto> {
  transform(getGraph: GetGraphDto) {
    getGraph.motorId = parseInt(getGraph.motorId + '');
    getGraph.parameter = getGraph.parameter.toLowerCase();
    return getGraph;
  }
}
