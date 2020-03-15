package space.datahub.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import space.datahub.domain.Mission;
import space.datahub.repo.MissionRepo;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/mission")
public class MissionController {
    private final MissionRepo missionRepo;

    @Autowired
    public MissionController(MissionRepo missionRepo) {
        this.missionRepo = missionRepo;
    }

    // GET request for get all missions in DB -> /api/mission
    @GetMapping
    public List<Mission> list(){
        return missionRepo.findAll();
    }

    // GET request for get one mission in DB by ID -> api/mission/4
    @GetMapping("{id}")
    public Mission getOne(@PathVariable("id") Mission mission){
        return mission;
    }

    // POST request for create mission -> api/mission
    @PostMapping
    public Mission create(@Valid @RequestBody Mission mission){
        return missionRepo.save(mission);
    }

    // PUT request for update mission data by ID -> api/mission/4
    @PutMapping("{id}")
    public Mission update(@PathVariable("id") Mission missionFromDb, @RequestBody Mission mission){
        BeanUtils.copyProperties(mission, missionFromDb, "id");
        return missionRepo.save(missionFromDb);
    }

    // DELETE request for delete mission by ID -> api/mission/4
    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Mission mission){
        missionRepo.delete(mission);
    }
}
